using System.ComponentModel.DataAnnotations;
namespace BlogManagement.DataLayer.ViewModels
{
    public class BlogViewModel
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "User Name is required.")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Date Created is required")]
        public DateTime DateCreated { get; set; }

        [Required(ErrorMessage = "Text is required")]
        public string Text { get; set; }
    }
}
