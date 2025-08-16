using SmartSpender.DAL.DTOs;
using SmartSpender.DAL.Models.Entities;
using SmartSpender.DAL.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartSpender.DAL.Services
{
    public class BusinessCategoryService : IBusinessCategoryService
    {
        private readonly IRepository<BusinessCategory> _repository;

        public BusinessCategoryService(IRepository<BusinessCategory> repository)
        {
            _repository = repository;
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
    }
}
