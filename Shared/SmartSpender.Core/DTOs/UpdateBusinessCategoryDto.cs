namespace SmartSpender.Core.DTOs
{
    public class UpdateBusinessCategoryDto
    {
        public int BusinessId { get; set; }
        public List<int> CategoryIds { get; set; }
    }
}
