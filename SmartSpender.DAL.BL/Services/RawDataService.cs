using SmartSpender.DAL.BL.DTOs;
using SmartSpender.DAL.BL.Models.Entities;
using SmartSpender.DAL.BL.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartSpender.DAL.BL.Services
{
    public class RawDataService : IRawDataService
    {
        private readonly IRepository<RawData> _repository;

        public RawDataService(IRepository<RawData> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<RawDataDto>> GetAllRawDataAsync()
        {
            var items = await _repository.GetAllAsync();
            return items.Select(i => new RawDataDto
            {
                DataId = i.DataId,
                Source = i.Source,
                Description = i.Description,
                Price = i.Price,
                IssueDate = i.IssueDate,
                CreatedDate = i.CreatedDate
            });
        }

        public async Task<RawDataDto?> GetRawDataByIdAsync(int id)
        {
            var i = await _repository.GetByIdAsync(id);
            if (i == null) return null;
            return new RawDataDto
            {
                DataId = i.DataId,
                Source = i.Source,
                Description = i.Description,
                Price = i.Price,
                IssueDate = i.IssueDate,
                CreatedDate = i.CreatedDate
            };
        }

        public async Task<RawDataDto> CreateRawDataAsync(CreateRawDataDto createDto)
        {
            var item = new RawData
            {
                Source = createDto.Source,
                Description = createDto.Description,
                Price = createDto.Price,
                IssueDate = createDto.IssueDate
            };
            await _repository.AddAsync(item);
            await _repository.SaveChangesAsync();

            return new RawDataDto
            {
                DataId = item.DataId,
                Source = item.Source,
                Description = item.Description,
                Price = item.Price,
                IssueDate = item.IssueDate,
                CreatedDate = item.CreatedDate
            };
        }

        public async Task<bool> UpdateRawDataAsync(int id, UpdateRawDataDto updateDto)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return false;

            item.Source = updateDto.Source;
            item.Description = updateDto.Description;
            item.Price = updateDto.Price;
            item.IssueDate = updateDto.IssueDate;

            _repository.Update(item);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteRawDataAsync(int id)
        {
            var item = await _repository.GetByIdAsync(id);
            if (item == null) return false;

            _repository.Delete(item);
            await _repository.SaveChangesAsync();
            return true;
        }

        public async Task CreateRawDataBulkAsync(IEnumerable<CreateRawDataDto> createRawDataDtos)
        {
            var allRawData = await _repository.GetAllAsync();

            foreach (var dto in createRawDataDtos)
            {
                bool exists = allRawData.Any(rd =>
                    rd.Source == dto.Source &&
                    rd.Description == dto.Description &&
                    rd.Price == dto.Price &&
                    rd.IssueDate == dto.IssueDate);

                if (!exists)
                {
                    var rawData = new RawData
                    {
                        Source = dto.Source,
                        Description = dto.Description,
                        Price = dto.Price,
                        IssueDate = dto.IssueDate
                    };
                    await _repository.AddAsync(rawData);
                }
            }
            await _repository.SaveChangesAsync();
        }
    }
}
