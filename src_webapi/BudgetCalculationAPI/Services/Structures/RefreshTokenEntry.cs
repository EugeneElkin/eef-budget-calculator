namespace BudgetCalculationAPI.Services.Structures
{
    using System;

    public class RefreshTokenEntry
    {
        public string UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public int LifetimeInMinutes { get; set; }
    }
}
