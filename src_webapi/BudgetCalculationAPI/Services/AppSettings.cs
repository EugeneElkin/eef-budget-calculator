namespace BudgetCalculationAPI.Services
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public int AccessTokenLifetimeInMinutes { get; set; }
        public int RefreshTokenLifetimeInMinutes { get; set; }
    }
}
