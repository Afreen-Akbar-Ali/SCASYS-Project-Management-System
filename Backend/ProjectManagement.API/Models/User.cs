using System.Text.Json.Serialization;

namespace ProjectManagement.API.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string FullName { get; set; } = "";

        public string Email { get; set; } = "";

        public string Username { get; set; } = "";

        public string Password { get; set; } = "";

        public string Role { get; set; } = "Employee";

        public bool IsActive { get; set; } = true;

        [JsonIgnore]
        public ICollection<Project> Projects { get; set; } = new List<Project>();

        [JsonIgnore]
        public ICollection<TaskItem> TaskItems { get; set; } = new List<TaskItem>();
    }
}