using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Interfaces;
using api.Data;
using api.Models;
using api.Mappers;
using Microsoft.EntityFrameworkCore;



namespace api.Services
{
public class ProductSaleService : IProductSaleService
    {
        private readonly ApplicationDbContext _context;

        public ProductSaleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductSaleDTO>> GetSalesByProductIdAsync(int productId)
        {
            return await _context.ProductSales
                .Where(s => s.ProductId == productId)
                .Select(s => s.ToDTO())
                .ToListAsync();
        }

public async Task CreateSaleAsync(ProductSaleDTO sale)
{
    // Find the product being sold
    var product = await _context.Products.FindAsync(sale.ProductId);

    if (product == null)
    {
        throw new Exception("Product not found");
    }

    // Check if there's enough quantity for the sale
    if (product.Qty < sale.Qty)
    {
        throw new Exception("Not enough quantity in stock");
    }

    // Decrease the product quantity
    product.Qty -= sale.Qty;

    // Save the sale
    var entity = sale.ToEntity();
    _context.ProductSales.Add(entity);

    // Save the updated product with reduced quantity
    _context.Products.Update(product);
    await _context.SaveChangesAsync();
}

    }
}