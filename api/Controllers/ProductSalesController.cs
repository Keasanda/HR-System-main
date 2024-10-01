using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Interfaces;
using api.Dtos;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductSalesController : ControllerBase
    {
        private readonly IProductSaleService _saleService;

        public ProductSalesController(IProductSaleService saleService)
        {
            _saleService = saleService;
        }

        // GET: api/productsales/product/{productId}
        [HttpGet("product/{productId}")]
        public async Task<ActionResult<IEnumerable<ProductSaleDTO>>> GetSalesByProductId(int productId)
        {
            var sales = await _saleService.GetSalesByProductIdAsync(productId);
      
if (sales == null || sales.Count() == 0) // Invoke Count() as a method
    return NotFound();




            return Ok(sales);
        }

        // POST: api/productsales
        [HttpPost]
        public async Task<IActionResult> CreateSale(ProductSaleDTO sale)
        {
            await _saleService.CreateSaleAsync(sale);
            return CreatedAtAction(nameof(GetSalesByProductId), new { productId = sale.ProductId }, sale);
        }
    }
}
