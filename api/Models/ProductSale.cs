using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ProductSale
    {
        
        [Key]
        public int SaleID { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public decimal SalePrice { get; set; }

        [Required]
        public int SaleQty { get; set; }

        [Required]
        public DateTime SaleDate { get; set; }

        public Product Product { get; set; } 

    }
}