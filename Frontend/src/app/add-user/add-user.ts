import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-user.html',
  styleUrls: ['./add-user.css']
})
export class AddUser {

  fullName = '';
  email = '';
  username = '';
  password = '';

  role = 'Employee';
  isActive = true;

  message = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  saveUser() {

    if (
      !this.fullName ||
      !this.email ||
      !this.username ||
      !this.password
    ) {
      alert("Please fill all fields.");
      return;
    }

    const user = {

      fullName: this.fullName,
      email: this.email,
      username: this.username,
      password: this.password,

      role: this.role,
      isActive: this.isActive

    };

    this.http.post(
      'http://localhost:5190/api/Users',
      user
    ).subscribe({

      next: () => {

        alert("Employee Added Successfully");

        this.router.navigate(['/users']);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to add employee");

      }

    });

  }

}
