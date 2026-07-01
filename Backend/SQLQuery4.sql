-- Check existing users
SELECT * FROM Users;

-- Insert a test user
INSERT INTO Users (Name, Email, Password, Role)
VALUES ('Afreen', 'afreen@gmail.com', '123456', 'Manager');

-- Verify user inserted
SELECT * FROM Users;

-- Test Login Stored Procedure
EXEC Login_ValidateUser
    @Email = 'afreen@gmail.com',
    @Password = '123456';