using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;

namespace api.Interfaces
{
    public interface IProductSaleService
    {
          Task<IEnumerable<ProductSaleDTO>> GetSalesByProductIdAsync(int productId);
        Task CreateSaleAsync(ProductSaleDTO sale);
    }
}