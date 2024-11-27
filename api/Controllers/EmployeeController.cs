using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Employee;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

using Microsoft.Extensions.Logging;

using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

using api.Interfaces;

namespace api.Controllers
{


[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ApplicationDBContext _context;
    private readonly ISenderEmail _emailSender;

    public EmployeeController(UserManager<AppUser> userManager, ApplicationDBContext context, ISenderEmail emailSender)
    {
        _userManager = userManager;
        _context = context;
        _emailSender = emailSender;
    }
  
[HttpPost]
public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeRequestDto employeeDto)
{
    if (employeeDto == null)
    {
        return BadRequest("Invalid data.");
    }

    // Check if the employee already exists (existing logic)
    bool employeeExists = await _context.Employees.AnyAsync(e =>
        (!string.IsNullOrEmpty(employeeDto.IdentityNumber) && e.IdentityNumber == employeeDto.IdentityNumber) ||
        (!string.IsNullOrEmpty(employeeDto.PassportNumber) && e.PassportNumber == employeeDto.PassportNumber) ||
        (!string.IsNullOrEmpty(employeeDto.TaxNumber) && e.TaxNumber == employeeDto.TaxNumber) ||
        (!string.IsNullOrEmpty(employeeDto.Email) && e.Email == employeeDto.Email) ||
        (employeeDto.AccountNumber != 0 && e.AccountNumber == employeeDto.AccountNumber)
    );

    if (employeeExists)
    {
        return Conflict("An employee with the same Identity Number, Passport Number, Tax Number, Email, or Account Number already exists.");
    }

    using (var transaction = await _context.Database.BeginTransactionAsync())
    {
        try
        {
            // Step 1: Create the employee
            var employee = new Employee
            {
                Name = employeeDto.Name,
                Surname = employeeDto.Surname,
                Email = employeeDto.Email,
                IdentityNumber = employeeDto.IdentityNumber,
                PassportNumber = employeeDto.PassportNumber,
                DateOfBirth = employeeDto.DateOfBirth,
                Gender = employeeDto.Gender,
                TaxNumber = employeeDto.TaxNumber,
                MaritalStatus = employeeDto.MaritalStatus,
                PhysicalAddress = employeeDto.PhysicalAddress,
                PostalAddress = employeeDto.PostalAddress,
                Salary = employeeDto.Salary,
                ContractType = employeeDto.ContractType,
                StartDate = employeeDto.StartDate,
                EndDate = employeeDto.EndDate,
                Url = employeeDto.Url,
                PasswordHash = employeeDto.PasswordHash, 
                BankName = employeeDto.BankName,
                AccountNumber = employeeDto.AccountNumber,
                AccountType = employeeDto.AccountType,
                BranchCode = employeeDto.BranchCode,
                QualificationType = employeeDto.QualificationType,
                YearCompleted = employeeDto.YearCompleted,
                Institution = employeeDto.Institution,
                RoleId = employeeDto.RoleId
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            // Step 2: Create the position linked to the employee
            var position = new Position
            {
                EmployeeId = employee.EmployeeId, // Link to Employee
                JobLevel = employeeDto.JobLevel,
                AnnualLeaveDays = employeeDto.AnnualLeaveDays,
                SickLeaveDays = employeeDto.SickLeaveDays
            };

            _context.Positions.Add(position);
            await _context.SaveChangesAsync();

            await transaction.CommitAsync();

            return Ok(new { Message = "Employee and position created successfully." });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}





[HttpGet]
public async Task<IActionResult> GetEmployees()
{
    var employees = await _context.Employees.ToListAsync();
    
    if (employees == null || !employees.Any())
    {
        return NotFound("No employees found.");
    }

    var employeeDtos = employees.Select(e => new EmployeeDto
    {   EmployeeId = e.EmployeeId,
        Name = e.Name,
        Surname = e.Surname,
        Email = e.Email,
        IdentityNumber = e.IdentityNumber,
        PassportNumber = e.PassportNumber,
        DateOfBirth = e.DateOfBirth,
        Gender = e.Gender,
        TaxNumber = e.TaxNumber,
        MaritalStatus = e.MaritalStatus,
        PhysicalAddress = e.PhysicalAddress,
        PostalAddress = e.PostalAddress,
        Salary = e.Salary,
        ContractType = e.ContractType,
        StartDate = e.StartDate,
        EndDate = e.EndDate,
        Url = e.Url,


            BankName = e.BankName,

        AccountNumber = e.AccountNumber,
        AccountType = e.AccountType ,

        BranchCode = e.BranchCode,




    QualificationType = e.QualificationType,

    YearCompleted = e.YearCompleted ,

    Institution = e.Institution




    }).ToList();

    return Ok(employeeDtos);
}


[HttpGet("{id}")]
public async Task<IActionResult> GetEmployeeById(int id)
{
    // Fetch employee by the exact ID passed in the request
    var employee = await _context.Employees
        .Where(e => e.EmployeeId == id)
        .Select(e => new EmployeeDto
        {
            Name = e.Name,
            Surname = e.Surname,
            Email = e.Email,
            IdentityNumber = e.IdentityNumber,
            PassportNumber = e.PassportNumber,
            DateOfBirth = e.DateOfBirth,
            Gender = e.Gender,
            TaxNumber = e.TaxNumber,
            MaritalStatus = e.MaritalStatus,
            PhysicalAddress = e.PhysicalAddress,
            PostalAddress = e.PostalAddress,
            Salary = e.Salary,
            ContractType = e.ContractType,
            StartDate = e.StartDate,
            EndDate = e.EndDate,
            Url = e.Url ,

            BankName = e.BankName,

        AccountNumber = e.AccountNumber,
        AccountType = e.AccountType ,

        BranchCode = e.BranchCode,




    QualificationType = e.QualificationType,

    YearCompleted = e.YearCompleted ,

    Institution = e.Institution




        })
        .FirstOrDefaultAsync();

    if (employee == null)
    {
        return NotFound($"Employee with ID {id} not found.");
    }

    return Ok(employee);
}



    [HttpGet("ConfirmEmail")]
    public async Task<IActionResult> ConfirmEmail(string token, string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
        {
            return BadRequest("Invalid Email.");
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (result.Succeeded)
        {
            return Ok("Email confirmed successfully.");
        }

        return BadRequest("Email confirmation failed.");
    }

    
}


}