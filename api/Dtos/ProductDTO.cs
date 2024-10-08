using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class ProductDTO
    {
         public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal SalePrice { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;

        public int Qty { get; set; } // Include quantity here
        
    }
}