using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ProductsController : BaseApiController
{
    private readonly StoreContext _context;
    private readonly IMapper _mapper;
    private readonly LocalImageService _imageService;

    public ProductsController(StoreContext context, IMapper mapper, LocalImageService imageService)
    {
        _context = context;
        _mapper = mapper;
        _imageService = imageService;
    }

    [HttpGet]
    public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
    {
        var query = _context.Products
            .Sort(productParams.OrderBy)
            .Search(productParams.SearchTerm)
            .Filter(productParams.Brands, productParams.Types)
            .AsQueryable();

        var products = await PagedList<Product>.ToPagedList(
            query,
            productParams.PageNumber,
            productParams.PageSize
        );

        Response.AddPaginationHeader(products.MetaData);

        return products;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return product;
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDto dto)
    {
        var product = _mapper.Map<Product>(dto);

        if (dto.File != null)
        {
            var result = await _imageService.AddImageAsync(dto.File);

            if (result.Error != null)
                return BadRequest(new ProblemDetails { Title = result.Error });

            product.PictureUrl = result.Url;
            product.PublicId = result.PublicId;
        }

        _context.Products.Add(product);
        var saved = await _context.SaveChangesAsync() > 0;

        if (!saved)
            return BadRequest("Error saving product");

        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut]
    public async Task<ActionResult<Product>> UpdateProduct([FromForm] UpdateProductDto dto)
    {
        var product = await _context.Products.FindAsync(dto.Id);
        if (product == null) return NotFound();

        _mapper.Map(dto, product);

        if (dto.File != null)
        {
            var upload = await _imageService.AddImageAsync(dto.File);
            if (upload.Error != null)
                return BadRequest(upload.Error);

            if (!string.IsNullOrEmpty(product.PublicId))
                await _imageService.DeleteImageAsync(product.PublicId);

            product.PictureUrl = upload.Url;
            product.PublicId = upload.PublicId;
        }

        var saved = await _context.SaveChangesAsync() > 0;
        if (!saved)
            return BadRequest("Failed to update product");

        return product;
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        if (!string.IsNullOrEmpty(product.PublicId))
            await _imageService.DeleteImageAsync(product.PublicId);

        _context.Products.Remove(product);

        var saved = await _context.SaveChangesAsync() > 0;
        if (!saved)
            return BadRequest("Error deleting product");

        return Ok();
    }
}
