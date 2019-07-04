namespace BudgetCalculationAPI.Services
{
    using AutoMapper;
    using BudgetCalculationAPI.Models;
    using DataWorkShop.Entities;

    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<NewCalculationViewModel, Calculation>()
                .ForMember(dest => dest.Id, opts => opts.Ignore())
                .ForMember(dest => dest.User, opts => opts.Ignore())
                .ForMember(dest => dest.UserId, opts => opts.Ignore())
                .ForMember(dest => dest.Items, opts => opts.Ignore())
                .ForMember(dest => dest.RowVersion, opts => opts.Ignore());
        }
    }
}
