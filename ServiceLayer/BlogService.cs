using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using BlogManagement.DataLayer.ViewModels;
namespace BlogManagement.ServiceLayer
{
    public class BlogService : IBlogService
    {
        private readonly string _filePath = Path.Combine(Directory.GetCurrentDirectory(), "BlogData.json");


        public async Task<List<BlogViewModel>> GetAllListAsync()
        {
            if (!File.Exists(_filePath)) return new List<BlogViewModel>();

            var jsonData = await File.ReadAllTextAsync(_filePath);
            return JsonSerializer.Deserialize<List<BlogViewModel>>(jsonData) ?? new List<BlogViewModel>();

        }

        public async Task CreateBlogAsync(BlogViewModel blogmodel)
        {
            var data = await GetAllListAsync();
            blogmodel.Id = data.Any() ? data.Max(x => x.Id) + 1 : 1; // Auto-increment Id
            data.Add(blogmodel);
            await SaveAllAsync(data);

        }

        public async Task UpdateBlogAsync(BlogViewModel blogViewModel)
        {
            var data = await GetAllListAsync();
            var existingModel = data.FirstOrDefault(x => x.Id == blogViewModel.Id);
            if (existingModel != null)
            {
                existingModel.Username = blogViewModel.Username;
                existingModel.Text = blogViewModel.Text;
                existingModel.DateCreated =blogViewModel.DateCreated;
                await SaveAllAsync(data);
            }
        }

        public async Task DeleteBlogAsync(int id)
        {
            var data = await GetAllListAsync();
            data.RemoveAll(x => x.Id == id);
            await SaveAllAsync(data);
        }

        private async Task SaveAllAsync(List<BlogViewModel> data)
        {
            var jsonData = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            await File.WriteAllTextAsync(_filePath, jsonData);
        }

        public async Task<BlogViewModel> GetBlogByIdAsync(int id)
        {
            var data = await GetAllListAsync();
            var existingModel = data.FirstOrDefault(x => x.Id == id);
            if (existingModel != null)
            {
                return existingModel;
            }
            else
            {
                return new BlogViewModel();
            }
        }
    }
}
