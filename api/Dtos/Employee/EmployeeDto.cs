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


  public string BankName { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
        public int AccountNumber { get; set; }
        public int BranchCode { get; set; }


        public string QualificationType { get; set; } = string.Empty;
        public DateTime YearCompleted { get; set; }
        public string Institution { get; set; } = string.Empty;




        public string? RoleId { get; set; } // Nullable


    }
}