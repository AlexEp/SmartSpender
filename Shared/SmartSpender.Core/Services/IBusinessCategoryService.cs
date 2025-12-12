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
        Task<bool> DeleteBusinessCategoryAsync(int id);
        Task<BusinessCategoryComparisonDto> GetBusinessCategoryComparisonAsync(int businessId);
        Task<CategoryBusinessComparisonDto> GetCategoryBusinessComparisonAsync(int categoryId);
        Task UpdateBusinessCategoriesAsync(UpdateBusinessCategoryDto updateDto);
        Task UpdateCategoryBusinessesAsync(UpdateCategoryBusinessDto updateDto);
    }
}
