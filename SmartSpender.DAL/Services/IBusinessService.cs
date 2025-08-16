using SmartSpender.DAL.DTOs;

namespace SmartSpender.DAL.Services
{
    public interface IBusinessService
    {
        Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync();
        Task<BusinessDto?> GetBusinessByIdAsync(int id);
    }
}
