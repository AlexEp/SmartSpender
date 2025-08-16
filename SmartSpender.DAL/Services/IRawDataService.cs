using SmartSpender.DAL.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.DAL.Services
{
    public interface IRawDataService
    {
        Task<IEnumerable<RawDataDto>> GetAllRawDataAsync();
        Task<RawDataDto?> GetRawDataByIdAsync(int id);
        Task<RawDataDto> CreateRawDataAsync(CreateRawDataDto createDto);
        Task<bool> UpdateRawDataAsync(int id, UpdateRawDataDto updateDto);
        Task<bool> DeleteRawDataAsync(int id);
    }
}
