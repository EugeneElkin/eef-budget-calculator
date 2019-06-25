namespace BudgetCalculationAPI.Controllers
{
    using System.Threading.Tasks;
    using AutoMapper;
    using BudgetCalculationAPI.Exceptions;
    using BudgetCalculationAPI.Models;
    using BudgetCalculationAPI.Services.Interfaces;
    using DataWorkShop.Entities;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [Authorize]
    [ApiController]
    [Produces("application/json")]
    [Route("api/users")]
    public class UsersController : Controller
    {
        private readonly IUserService userService;
        private readonly ITokenService tokenService;

        public UsersController(IUserService userService, ITokenService tokenService)
        {
            this.userService = userService;
            this.tokenService = tokenService;
        }

        [AllowAnonymous]
        // POST: api/users
        [HttpPost]
        public async Task<IActionResult> Register([FromBody]NewUserViewModel newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = Mapper.Map<User>(newUser);

            try
            {
                await this.userService.Create(user, newUser.Password);
                return Ok();
            }
            catch (CustomException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [AllowAnonymous]
        // POST: api/users/token
        [HttpPost("token")]
        public async Task<IActionResult> Authenticate([FromBody]AuthenticatingUserViewModel authenticatingUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var dbUser = await this.userService.Authenticate(authenticatingUser.UserName, authenticatingUser.Password);
                var token = this.tokenService.CreateAccessToken(dbUser);

                return Ok(
                    new AuthenticatedUserViewModel
                    {
                        Id = dbUser.Id,
                        UserName = dbUser.UserName,
                        FirstName = dbUser.FirstName,
                        LastName = dbUser.LastName,
                        TokenInfo = new TokenViewModel
                        {
                            AccessToken = token.AccessToken,
                            RefreshToken = token.RefreshToken
                        }
                    });
            }
            catch (CustomException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // TODO: Add action for Lof Out and ticket release

        [AllowAnonymous]
        // POST: api/users/newtoken
        [HttpPost("newtoken")]
        public async Task<IActionResult> RefreshTokens([FromBody]TokenRequestViewModel tokenRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var tokenInfo = await Task.FromResult(this.tokenService.UpdateAccessToken(tokenRequest.UserId, tokenRequest.RefreshToken));
                return Ok(tokenInfo);
            }
            catch (CustomException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
