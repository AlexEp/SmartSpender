using Microsoft.AspNetCore.Mvc;
using SmartSpender.Core.DTOs;
using SmartSpender.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.DAL.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessCategoriesController : ControllerBase
    {
        private readonly IBusinessCategoryService _service;

        public BusinessCategoriesController(IBusinessCategoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BusinessCategoryDto>>> GetBusinessCategories()
        {
            var items = await _service.GetAllBusinessCategoriesAsync();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BusinessCategoryDto>> GetBusinessCategory(int id)
        {
            var item = await _service.GetBusinessCategoryByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<BusinessCategoryDto>> CreateBusinessCategory(CreateBusinessCategoryDto createDto)
        {
            var createdItem = await _service.CreateBusinessCategoryAsync(createDto);
            return CreatedAtAction(nameof(GetBusinessCategory), new { id = createdItem.Id }, createdItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusinessCategory(int id, UpdateBusinessCategoryDto updateDto)
        {
            var result = await _service.UpdateBusinessCategoryAsync(id, updateDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusinessCategory(int id)
        {
            var result = await _service.DeleteBusinessCategoryAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
