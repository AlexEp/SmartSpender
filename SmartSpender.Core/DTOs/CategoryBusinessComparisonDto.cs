using System.Collections.Generic;

namespace SmartSpender.Core.DTOs
{
    public class CategoryBusinessComparisonDto
    {
        public CategoryDto Category { get; set; }
        public List<BusinessDto> IncludedBusinesses { get; set; }
        public List<BusinessDto> NotIncludedBusinesses { get; set; }
    }
}
