using BlogManagement.DataLayer.ViewModels;
namespace BlogManagement.ServiceLayer
{
    public interface IBlogService
    {
        /// <summary>
        /// Get Blog List
        /// </summary>
        /// <returns></returns>
        Task<List<BlogViewModel>> GetAllListAsync();

        /// <summary>
        /// Create new blog
        /// </summary>
        /// <param name="blogmodel"></param>
        /// <returns></returns>
        Task CreateBlogAsync(BlogViewModel blogmodel);

        /// <summary>
        /// Update blog
        /// </summary>
        /// <param name="blogmodel"></param>
        /// <returns></returns>
        Task UpdateBlogAsync(BlogViewModel blogmodel);

        /// <summary>
        /// Delete blog
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task DeleteBlogAsync(int id);

        /// <summary>
        /// Get blog by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<BlogViewModel> GetBlogByIdAsync(int id);
    }
}

    