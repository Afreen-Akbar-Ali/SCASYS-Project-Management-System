using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.API.Data;

namespace ProjectManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public DashboardController(ProjectDbContext context)
        {
            _context = context;
        }

        [HttpGet("EmployeeWorkload")]
        public async Task<IActionResult> EmployeeWorkload()
        {
            var result = await _context.Users
                .Where(u => u.Role == "Employee")
                .Select(u => new
                {
                    employeeName = u.FullName,
                    taskCount = _context.TaskItems.Count(t => t.UserId == u.UserId)
                })
                .OrderByDescending(x => x.taskCount)
                .ToListAsync();

            return Ok(result);
        }
    }
}