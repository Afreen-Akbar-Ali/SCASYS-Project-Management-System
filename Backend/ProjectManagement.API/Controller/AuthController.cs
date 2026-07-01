using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProjectManagement.API.Models;
using System.Data;

namespace ProjectManagement.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            try
            {
                using SqlConnection con = new SqlConnection(
                    _configuration.GetConnectionString("DefaultConnection"));

                using SqlCommand cmd = new SqlCommand(
                    "Login_ValidateUser", con);

                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@UsernameOrEmail", request.Email);
                cmd.Parameters.AddWithValue("@Password", request.Password);

                con.Open();

                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    string role = reader["Role"].ToString()!;

                    if (role != "Admin")
                    {
                        return Unauthorized("Only HR can login.");
                    }

                    return Ok(new LoginResponse
                    {
                        UserId = Convert.ToInt32(reader["UserId"]),
                        Name = reader["FullName"].ToString()!,
                        Email = reader["Email"].ToString()!,
                        Role = role
                    });
                }

                return Unauthorized("Invalid Email or Password");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}