namespace ProjectManagement.API.Models
{
    public class TaskItem
    {
        public int TaskItemId { get; set; }

        public string TaskName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime DueDate { get; set; }

        public string Priority { get; set; } = "Medium";

        public string Status { get; set; } = "Not Started";

        public int ProjectId { get; set; }

        public Project? Project { get; set; }

        public int UserId { get; set; }

        public User? User { get; set; }
    }
}