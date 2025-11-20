using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace API.Services
{
    public class LocalImageService
    {
        private readonly IWebHostEnvironment _env;

        public LocalImageService(IWebHostEnvironment env)
        {
            _env = env;
        }

        // Save image locally
        public async Task<(string Url, string PublicId, string Error)> AddImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return (null, null, "Invalid image");

            var uploadsFolder = Path.Combine(_env.WebRootPath, "images");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            string url = $"/images/{fileName}";

            return (url, fileName, null);
        }

        // Delete image locally
        public Task<bool> DeleteImageAsync(string publicId)
        {
            var uploadsFolder = Path.Combine(_env.WebRootPath, "images");
            var filePath = Path.Combine(uploadsFolder, publicId);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return Task.FromResult(true);
            }

            return Task.FromResult(false);
        }
    }
}
