using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class ProductSaleDTO
    {
        public int SaleID { get; set; }
        public int ProductId { get; set; }
        public decimal SalePrice { get; set; }
        public int Qty { get; set; }
        public DateTime SaleDate { get; set; }
        
    }
}