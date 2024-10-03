using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Mappers
{
       public static class ProductSaleMapper
    {
        public static ProductSaleDTO ToDTO(this ProductSale sale) => new ProductSaleDTO
        {
            SaleID = sale.SaleID,
            ProductId = sale.ProductId,
            SalePrice = sale.SalePrice,
            SaleQty = sale.SaleQty,
            SaleDate = sale.SaleDate
        };

        public static ProductSale ToEntity(this ProductSaleDTO dto) => new ProductSale
        {
            SaleID = dto.SaleID,
            ProductId = dto.ProductId,
            SalePrice = dto.SalePrice,
            SaleQty= dto.SaleQty,
            SaleDate = dto.SaleDate
        };
    }
}