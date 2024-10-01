using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;


namespace api.Mappers
{
    public static class ProductMapper
    {
        
 public static ProductDTO ToDTO(this Product product) => new ProductDTO
        {
            Id = product.Id,
            Description = product.Description,
            SalePrice = product.SalePrice,
            Category = product.Category,
            Image = product.Image
        };

        public static Product ToEntity(this ProductDTO dto) => new Product
        {
            Id = dto.Id,
            Description = dto.Description,
            SalePrice = dto.SalePrice,
            Category = dto.Category,
            Image = dto.Image
        };



    }
}