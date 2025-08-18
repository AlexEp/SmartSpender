using SmartSpender.Core.DTOs;
using SmartSpender.Core.Models.Entities;
using SmartSpender.Core.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SmartSpender.Core.Services
{
    public class BusinessCategoryService : IBusinessCategoryService
    {
        private readonly IRepository<BusinessCategory> _repository;
        private readonly IRepository<Business> _businessRepository;
        private readonly IRepository<Category> _categoryRepository;

        public BusinessCategoryService(IRepository<BusinessCategory> repository, IRepository<Business> businessRepository, IRepository<Category> categoryRepository)
        {
            _repository = repository;
            _businessRepository = businessRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<BusinessCategoryDto>> GetAllBusinessCategoriesAsync()
        {
            var items = await _repository.GetAllAsync();
            return items.Select(i => new BusinessCategoryDto { Id = i.Id, BusinessId = i.BusinessId, CategoryId = i.CategoryId });
        }

        public async Task<BusinessCategoryDto?> GetBusinessCategoryByIdAsync(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return null;
            return new BusinessCategoryDto { Id = item.Id, BusinessId = item.BusinessId, CategoryId = item.CategoryId };
        }

        public async Task<BusinessCategoryDto> CreateBusinessCategoryAsync(CreateBusinessCategoryDto createDto)
        {
            var item = new BusinessCategory
            {
                BusinessId = createDto.BusinessId,
                CategoryId = createDto.CategoryId
            };
            await _repository.AddAsync(item);
            await _repository.SaveChangesAsync();
            return new BusinessCategoryDto { Id = item.Id, BusinessId = item.BusinessId, CategoryId = item.CategoryId };
        }

        public async Task<bool> UpdateBusinessCategoryAsync(int id, UpdateBusinessCategoryDto updateDto)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return false;

            item.BusinessId = updateDto.BusinessId;
            item.CategoryId = updateDto.CategoryId;
            _repository.Update(item);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteBusinessCategoryAsync(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return false;

            _repository.Delete(item);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<BusinessCategoryComparisonDto> GetBusinessCategoryComparisonAsync(int businessId)
        {
            var business = await _businessRepository.GetByIdAsync(businessId);
            if (business == null)
            {
                return null;
            }

            var allCategories = await _categoryRepository.GetAllAsync();
            var includedCategoryIds = (await _repository.GetAllAsync())
                                        .Where(bc => bc.BusinessId == businessId)
                                        .Select(bc => bc.CategoryId);

            var includedCategories = allCategories.Where(c => includedCategoryIds.Contains(c.Id))
                                                  .Select(c => new CategoryDto { Id = c.Id, Name = c.Name })
                                                  .ToList();

            var notIncludedCategories = allCategories.Where(c => !includedCategoryIds.Contains(c.Id))
                                                     .Select(c => new CategoryDto { Id = c.Id, Name = c.Name })
                                                     .ToList();

            return new BusinessCategoryComparisonDto
            {
                Business = new BusinessDto { Id = business.Id, Name = business.Name },
                IncludedCategories = includedCategories,
                NotIncludedCategories = notIncludedCategories
            };
        }

        public async Task<CategoryBusinessComparisonDto> GetCategoryBusinessComparisonAsync(int categoryId)
        {
            var category = await _categoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                return null;
            }

            var allBusinesses = await _businessRepository.GetAllAsync();
            var includedBusinessIds = (await _repository.GetAllAsync())
                                        .Where(bc => bc.CategoryId == categoryId)
                                        .Select(bc => bc.BusinessId);

            var includedBusinesses = allBusinesses.Where(b => includedBusinessIds.Contains(b.Id))
                                                  .Select(b => new BusinessDto { Id = b.Id, Name = b.Name })
                                                  .ToList();

            var notIncludedBusinesses = allBusinesses.Where(b => !includedBusinessIds.Contains(b.Id))
                                                     .Select(b => new BusinessDto { Id = b.Id, Name = b.Name })
                                                     .ToList();

            return new CategoryBusinessComparisonDto
            {
                Category = new CategoryDto { Id = category.Id, Name = category.Name },
                IncludedBusinesses = includedBusinesses,
                NotIncludedBusinesses = notIncludedBusinesses
            };
        }
    }
}
