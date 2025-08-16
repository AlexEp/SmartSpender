using SmartSpender.DAL.DTOs;

namespace SmartSpender.DAL.Services
{
    public interface IBusinessService
    {
        Task<IEnumerable<BusinessDto>> GetAllBusinessesAsync();
        Task<BusinessDto?> GetBusinessByIdAsync(int id);
        Task<BusinessDto> CreateBusinessAsync(CreateBusinessDto createBusinessDto);
        Task<bool> UpdateBusinessAsync(int id, UpdateBusinessDto updateBusinessDto);
        Task<bool> DeleteBusinessAsync(int id);
    }
}
