using Microsoft.AspNetCore.Mvc;
using SmartSpender.DAL.BL.DTOs;
using SmartSpender.DAL.BL.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.DAL.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RawDataController : ControllerBase
    {
        private readonly IRawDataService _service;

        public RawDataController(IRawDataService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RawDataDto>>> GetRawData()
        {
            var items = await _service.GetAllRawDataAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RawDataDto>> GetRawData(int id)
        {
            var item = await _service.GetRawDataByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<RawDataDto>> CreateRawData(CreateRawDataDto createDto)
        {
            var createdItem = await _service.CreateRawDataAsync(createDto);
            return CreatedAtAction(nameof(GetRawData), new { id = createdItem.DataId }, createdItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRawData(int id, UpdateRawDataDto updateDto)
        {
            var result = await _service.UpdateRawDataAsync(id, updateDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRawData(int id)
        {
            var result = await _service.DeleteRawDataAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
