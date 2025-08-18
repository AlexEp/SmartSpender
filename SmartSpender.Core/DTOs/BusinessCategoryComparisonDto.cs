using System.Collections.Generic;

namespace SmartSpender.Core.DTOs
{
    public class BusinessCategoryComparisonDto
    {
        public BusinessDto Business { get; set; }
        public List<CategoryDto> IncludedCategories { get; set; }
        public List<CategoryDto> NotIncludedCategories { get; set; }
    }
}
