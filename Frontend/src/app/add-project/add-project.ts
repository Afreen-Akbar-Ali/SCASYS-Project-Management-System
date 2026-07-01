import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-project.html',
  styleUrls: ['./add-project.css']
})
export class AddProjectComponent implements OnInit {

  projectName = '';
  description = '';

  startDate = '';
  dueDate = '';

  priority = 'Medium';
  status = 'Not Started';

  userId = 0;

  users: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.http.get<any[]>(
      'http://localhost:5190/api/Users'
    ).subscribe({

      next: (data) => {

        this.users = data.filter(x => x.role === "Employee");

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  saveProject() {

    if (
      !this.projectName ||
      !this.description ||
      !this.startDate ||
      !this.dueDate ||
      this.userId === 0
    ) {

      alert("Please fill all fields.");
      return;

    }

    const project = {

      projectName: this.projectName,
      description: this.description,

      startDate: this.startDate,
      dueDate: this.dueDate,

      priority: this.priority,
      status: this.status,

      userId: this.userId

    };

    this.http.post(
      'http://localhost:5190/api/Projects',
      project
    ).subscribe({

      next: () => {

        alert("Project Added Successfully");

        this.router.navigate(['/projects']);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to add project");

      }

    });

  }

}
