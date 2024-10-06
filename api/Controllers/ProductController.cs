using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Dtos;

namespace api.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
      _productService = productService;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDTO>>> GetProducts()
    {
      var products = await _productService.GetProductsAsync();
      return Ok(products);
    }

    // GET: api/products/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDTO>> GetProduct(int id)
    {
      var product = await _productService.GetProductByIdAsync(id);
      if (product == null)
        return NotFound();

      return Ok(product);
    }

    // POST: api/products
    [HttpPost]
    public async Task<IActionResult> CreateProduct(ProductDTO product)
    {
      await _productService.CreateProductAsync(product);
      return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // PUT: api/products/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProduct(int id, ProductDTO product)
    {
      // Ignore the incoming product.Id and use the id from the URL
      product.Id = id;

      await _productService.UpdateProductAsync(product);
      return NoContent();
    }

    // DELETE: api/products/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
      await _productService.DeleteProductAsync(id);
      return NoContent();
    }
  }
}
