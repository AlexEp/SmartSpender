using SmartSpender.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.Core.Services
{
    public interface IBusinessCategoryService
    {
        Task<IEnumerable<BusinessCategoryDto>> GetAllBusinessCategoriesAsync();
        Task<BusinessCategoryDto?> GetBusinessCategoryByIdAsync(int id);
        Task<BusinessCategoryDto> CreateBusinessCategoryAsync(CreateBusinessCategoryDto createDto);
        Task<bool> UpdateBusinessCategoryAsync(int id, UpdateBusinessCategoryDto updateDto);
        Task<bool> DeleteBusinessCategoryAsync(int id);
    }
}
