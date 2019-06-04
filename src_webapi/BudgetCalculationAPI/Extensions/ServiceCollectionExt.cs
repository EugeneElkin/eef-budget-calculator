namespace BudgetCalculationAPI.Extensions
{
    using BudgetCalculationAPI.Services;
    using BudgetCalculationAPI.Services.Interfaces;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceCollectionExt
    {
        public static void AddUserService(this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
        }

        public static void AddTokenService(this IServiceCollection services)
        {
            services.AddSingleton<ITokenService, TokenService>();
        }
    }
}
