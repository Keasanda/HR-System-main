using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class EmployeeDto
    {

 public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string? IdentityNumber { get; set; } // Nullable
        public string? PassportNumber { get; set; } // Nullable
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string? TaxNumber { get; set; } // Nullable
        public string MaritalStatus { get; set; }
        public string PhysicalAddress { get; set; }
        public string PostalAddress { get; set; }
        public decimal Salary { get; set; }
        public string ContractType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; } // Nullable
        public string? Url { get; set; } // Nullable
        public string? PasswordHash { get; set; } // Nullable

        public string? RoleId { get; set; } // Nullable


    }
}