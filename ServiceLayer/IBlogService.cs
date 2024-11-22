using BlogManagement.DataLayer.ViewModels;
namespace BlogManagement.ServiceLayer
{
    public interface IBlogService
    {
        Task<List<BlogViewModel>> GetAllListAsync();

        Task CreateBlogAsync(BlogViewModel blogmodel);

        Task UpdateBlogAsync(BlogViewModel blogmodel);

        Task DeleteBlogAsync(int id);

        Task<BlogViewModel> GetBlogByIdAsync(int id);
    }
}
    