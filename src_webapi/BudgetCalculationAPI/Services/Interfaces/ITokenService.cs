namespace BudgetCalculationAPI.Services.Interfaces
{
    using BudgetCalculationAPI.Services.Structures;
    using DataWorkShop.Entities;

    public interface ITokenService
    {
        JsonWebToken CreateAccessToken(User user);
        JsonWebToken UpdateAccessToken(string userId, string refreshToken);
    }
}
