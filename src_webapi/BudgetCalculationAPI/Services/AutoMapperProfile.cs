namespace BudgetCalculationAPI.Services
{
    using AutoMapper;
    using BudgetCalculationAPI.Models;
    using DataWorkShop.Entities;

    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<NewCalculationViewModel, Calculation>();
        }
    }
}
