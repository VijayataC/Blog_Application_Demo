using BlogManagement.DataLayer.ViewModels;
using BlogManagement.ServiceLayer;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BlogManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly ILogger<BlogController> logger;
        private readonly IBlogService _blogService;
        public BlogController(IBlogService blogService) { 
            _blogService = blogService;
        }

       /// <summary>
       /// Get Blog List
       /// </summary>
       /// <returns></returns>
        [HttpGet("GetAllBlogList")]
        public async Task<List<BlogViewModel>> GetAllBlogListAsync()
        {
           return await _blogService.GetAllListAsync();
    }

        /// <summary>
        /// Get blog  by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("GetBlogById/{id}")]
        public async Task<BlogViewModel> GetBlogByIdAsync(int id)
        {
            return await _blogService.GetBlogByIdAsync(id);
        }

        /// <summary>
        /// Create new Blog
        /// </summary>
        /// <param name="blogmodel"></param>
        /// <returns></returns>
        [HttpPost("CreateBlog")]
        public async Task CreateBlogAsync([FromBody] BlogViewModel blogmodel)
        {
             await _blogService.CreateBlogAsync(blogmodel);
        }

        /// <summary>
        /// Update blog
        /// </summary>
        /// <param name="blogViewModel"></param>
        /// <returns></returns>
        [HttpPut("UpdateBlog")]
        public async Task UpdateBlogAsync([FromBody] BlogViewModel blogViewModel)
        {
            await _blogService.UpdateBlogAsync(blogViewModel); 
        }

        /// <summary>
        /// Delete blog
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("DeleteBlog")]
        public async Task  DeleteBlog(int id)
        {
            await _blogService.DeleteBlogAsync(id);
         
        }
    }
}
