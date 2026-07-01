using System.Text.Json.Serialization;

namespace ProjectManagement.API.Models
{
    public class Project
    {
        public int ProjectId { get; set; }

        public string ProjectName { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }

        public DateTime DueDate { get; set; }

        public string Priority { get; set; } = "Medium";

        public string Status { get; set; } = "Not Started";

        public int UserId { get; set; }

        public User? User { get; set; }

        [JsonIgnore]
        public ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
    }
}