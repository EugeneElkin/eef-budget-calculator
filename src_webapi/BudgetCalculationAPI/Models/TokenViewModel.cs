﻿namespace BudgetCalculationAPI.Models
{
    public class TokenViewModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public long Expires { get; set; }
    }
}
