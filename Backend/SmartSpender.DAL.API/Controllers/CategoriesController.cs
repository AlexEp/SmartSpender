using Microsoft.AspNetCore.Mvc;
using SmartSpender.Core.DTOs;
using SmartSpender.Core.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartSpender.DAL.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IReportingService _reportingService;

        public CategoriesController(ICategoryService categoryService, IReportingService reportingService)
        {
            _categoryService = categoryService;
            _reportingService = reportingService;
        }

        [HttpGet("{id}/monthly-summary")]
        public async Task<ActionResult<IEnumerable<CategoryMonthlySummaryDto>>> GetCategoryMonthlySummary(int id)
        {
            var summary = await _reportingService.GetCategoryMonthlySummaryAsync(id);
            return Ok(summary);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryService.GetAllCategoriesAsync();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(int id)
        {
            var category = await _categoryService.GetCategoryByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> CreateCategory(CreateCategoryDto createCategoryDto)
        {
            var createdCategory = await _categoryService.CreateCategoryAsync(createCategoryDto);
            return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.CategoryId }, createdCategory);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, UpdateCategoryDto updateCategoryDto)
        {
            var result = await _categoryService.UpdateCategoryAsync(id, updateCategoryDto);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var result = await _categoryService.DeleteCategoryAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
