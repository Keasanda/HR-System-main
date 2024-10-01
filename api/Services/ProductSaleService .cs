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
            var entity = sale.ToEntity();
            _context.ProductSales.Add(entity);
            await _context.SaveChangesAsync();
        }
    }
}