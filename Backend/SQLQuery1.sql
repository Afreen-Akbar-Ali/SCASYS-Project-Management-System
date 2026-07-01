CREATE PROCEDURE Login_ValidateUser
    @Email NVARCHAR(100),
    @Password NVARCHAR(100)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE Email = @Email
    AND Password = @Password
END