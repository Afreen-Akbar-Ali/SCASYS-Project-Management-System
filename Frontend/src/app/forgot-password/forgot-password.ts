import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.css']
})
export class ForgotPasswordComponent {

  email = '';

  constructor(private router: Router) { }

  sendResetLink() {

    if (!this.email) {

      alert("Please enter your email.");

      return;

    }

    alert("Password reset link has been sent to your email.");

    this.router.navigate(['/']);

  }

}
