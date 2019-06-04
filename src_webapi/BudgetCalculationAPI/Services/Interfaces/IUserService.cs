namespace BudgetCalculationAPI.Services.Interfaces
{
    using DataWorkShop.Entities;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<User> GetById(string id);

        Task<User> Create(User user, string password);

        Task<User> Authenticate(string userName, string password);
    }
}
