using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Employee
{
    public class CreateEmployeeRequestDto
    {


        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? IdentityNumber { get; set; } // Nullable
        public string? PassportNumber { get; set; } // Nullable
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; } = string.Empty;
        public string? Url { get; set; } // Nullable
        public string? TaxNumber { get; set; } // Nullable
        public string MaritalStatus { get; set; } = string.Empty;
        public string PhysicalAddress { get; set; } = string.Empty;
        public string PostalAddress { get; set; } = string.Empty;
        public int Salary { get; set; }
        public string ContractType { get; set; } = string.Empty;
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime? EndDate { get; set; } // Nullable
        public string? PasswordHash { get; set; } // Nullable

        public string? RoleId { get; set; } // Nullable


    }
}