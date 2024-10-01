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
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsAsync()
        {
            return await _context.Products
                .Select(p => p.ToDTO())
                .ToListAsync();
        }

        public async Task<ProductDTO> GetProductByIdAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            return product?.ToDTO();
        }

        public async Task CreateProductAsync(ProductDTO product)
        {
            var entity = product.ToEntity();
            _context.Products.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(ProductDTO product)
        {
            var entity = await _context.Products.FindAsync(product.Id);
            if (entity != null)
            {
                entity.Description = product.Description;
                entity.SalePrice = product.SalePrice;
                entity.Category = product.Category;
                entity.Image = product.Image;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}