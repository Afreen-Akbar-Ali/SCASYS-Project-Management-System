import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-user.html',
  styleUrls: ['./edit-user.css']
})
export class EditUser implements OnInit {

  id = 0;

  user: any = {
    userId: 0,
    fullName: '',
    email: '',
    username: '',
    password: '',
    role: 'Employee',
    isActive: true
  };

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.http.get<any>(
      `http://localhost:5190/api/Users/${this.id}`
    ).subscribe({

      next: (data) => {

        this.user = data;

      },

      error: (err) => {

        console.log(err);
        alert("Unable to load employee.");

      }

    });

  }

  updateUser() {

    this.http.put(

      `http://localhost:5190/api/Users/${this.id}`,
      this.user

    ).subscribe({

      next: () => {

        alert("Employee Updated Successfully");

        this.router.navigate(['/users']);

      },

      error: (err) => {

        console.log(err);

        alert("Update Failed");

      }

    });

  }

}
