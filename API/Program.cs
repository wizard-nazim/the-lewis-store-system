using API.Data;
using API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --------------------
// Database (SQLite)
// --------------------
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// --------------------
// Controllers & Swagger
// --------------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --------------------
// Services
// --------------------
builder.Services.AddScoped<LocalImageService>();  // Image handling
builder.Services.AddScoped<PaymentService>();     // Fake payment service

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// --------------------
// Static files (for images)
// --------------------
builder.Services.AddDirectoryBrowser();

// --------------------
// Build app
// --------------------
var app = builder.Build();

// --------------------
// Middleware
// --------------------
app.UseSwagger();
app.UseSwaggerUI();

// Serve static files from wwwroot
app.UseStaticFiles();

// --------------------
// Optional: Auth placeholders
// --------------------
// For now, authorization is effectively disabled. 
// If you add JWT later, uncomment:
// app.UseAuthentication();
// app.UseAuthorization();

app.MapControllers();

app.Run();
