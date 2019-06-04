namespace BudgetCalculationAPI.Services
{
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using BudgetCalculationAPI.Exceptions;
    using BudgetCalculationAPI.Services.Interfaces;
    using BudgetCalculationAPI.Services.Structures;
    using DataWorkShop.Entities;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;

    public class TokenService : ITokenService
    {
        private readonly AppSettings appSettings;
        private readonly IDictionary<string, RefreshTokenEntry> refreshTokensList;

        public TokenService(IOptions<AppSettings> settingsOptions)
        {
            this.appSettings = settingsOptions.Value;
            this.refreshTokensList = new Dictionary<string, RefreshTokenEntry>();
        }

        public JsonWebToken CreateAccessToken(User user)
        {
            return this.CreateTokensPair(user.Id);
        }

        public JsonWebToken UpdateAccessToken(string userId, string refreshToken)
        {
            if (!this.refreshTokensList.ContainsKey(refreshToken))
            {
                throw new CustomException("Refresh token is invalid!");
            }

            var refreshTokenEntry = this.refreshTokensList[refreshToken];

            // Revoke previous refresh token
            this.refreshTokensList.Remove(refreshToken);

            if (refreshTokenEntry.UserId != userId)
            {
                throw new CustomException("User is invalid! Refresh token was revoked!");
            }

            var currentUtcDate = DateTime.UtcNow;
            var totalMinutes = (currentUtcDate - refreshTokenEntry.CreatedAt).TotalMinutes;

            if (totalMinutes >= refreshTokenEntry.LifetimeInMinutes)
            {
                throw new CustomException("Refresh token is expired! Please re-login!");
            }

            return this.CreateTokensPair(userId);
        }

        private JsonWebToken CreateTokensPair(string userId)
        {
            var accessToken = this.GenerateAccessToken(userId);
            var refreshToken = this.GenerateRefreshToken();

            this.refreshTokensList[refreshToken] = new RefreshTokenEntry
            {
                UserId = userId,
                CreatedAt = DateTime.UtcNow,
                LifetimeInMinutes = this.appSettings.RefreshTokenLifetimeInMinutes
            };

            return new JsonWebToken
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken
            };
        }

        private string GenerateAccessToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim(ClaimTypes.Name, userId)
                }),
                Expires = DateTime.UtcNow.AddMinutes(this.appSettings.AccessTokenLifetimeInMinutes),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        private string GenerateRefreshToken()
        {
            var inputString = string.Format("{0}{1}{2}{3}", 
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString(),
                Guid.NewGuid().ToString());

            var plainTextBytes = Encoding.UTF8.GetBytes(inputString);
            return Convert.ToBase64String(plainTextBytes);
        }
    }
}
