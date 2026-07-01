using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagement.API.Data;
using ProjectManagement.API.Models;

namespace ProjectManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly ProjectDbContext _context;

        public TaskItemsController(ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/TaskItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetTasks()
        {
            return await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.User)
                .ToListAsync();
        }

        // GET: api/TaskItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTask(int id)
        {
            var task = await _context.TaskItems
                .Include(t => t.Project)
                .Include(t => t.User)
                .FirstOrDefaultAsync(t => t.TaskItemId == id);

            if (task == null)
                return NotFound();

            return task;
        }

        // POST: api/TaskItems
        [HttpPost]
        public async Task<ActionResult<TaskItem>> CreateTask(TaskItem task)
        {
            _context.TaskItems.Add(task);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask),
                new { id = task.TaskItemId },
                task);
        }

        // PUT: api/TaskItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskItem task)
        {
            if (id != task.TaskItemId)
                return BadRequest();

            var existingTask = await _context.TaskItems.FindAsync(id);

            if (existingTask == null)
                return NotFound();

            existingTask.TaskName = task.TaskName;
            existingTask.Description = task.Description;
            existingTask.StartDate = task.StartDate;
            existingTask.DueDate = task.DueDate;
            existingTask.Priority = task.Priority;
            existingTask.Status = task.Status;
            existingTask.ProjectId = task.ProjectId;
            existingTask.UserId = task.UserId;

            await _context.SaveChangesAsync();

            return Ok(existingTask);
        }

        // DELETE: api/TaskItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.TaskItems.FindAsync(id);

            if (task == null)
                return NotFound();

            _context.TaskItems.Remove(task);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}