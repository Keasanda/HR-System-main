using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace api.Models
{
    public class Product
    {
        
                 [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal SalePrice { get; set; }

        [Required]
        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        public string Image { get; set; }   = string.Empty;   // Image saved as a string (URL or path)
        
         public int Qty { get; set; } // New property for quantity

        public ICollection<ProductSale> Sales { get; set; }      // Relationship with sales



    }
}