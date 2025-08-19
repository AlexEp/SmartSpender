namespace SmartSpender.Core.DTOs
{
    public class UpdateCategoryBusinessDto
    {
        public int CategoryId { get; set; }
        public List<int> BusinessIds { get; set; }
    }
}
