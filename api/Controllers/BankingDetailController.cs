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
    public class BankingDetailController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ApplicationDBContext _context;

        public BankingDetailController(UserManager<AppUser> userManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBankingDetails([FromBody] BankingDetailDto bankingDetailDto)
        {
            // Step 1: Find the user using AppUserId
            var user = await _userManager.FindByIdAsync(bankingDetailDto.AppUserId);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            // Step 2: Create a new BankingDetails record
            var bankingDetail = new BankingDetail
            {
                BankName = bankingDetailDto.BankName,
                AccountNumber = bankingDetailDto.AccountNumber,
                AccountType = bankingDetailDto.AccountType,
                BranchCode = bankingDetailDto.BranchCode,
                AppUserId = bankingDetailDto.AppUserId // Link BankingDetails to AppUser via AppUserId
            };

            // Step 3: Add the banking details to the context
            _context.BankingDetails.Add(bankingDetail);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Banking details created successfully." });
        }
    }
}