import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './add-task.html',
  styleUrls: ['./add-task.css']
})
export class AddTaskComponent implements OnInit {

  taskName = '';
  description = '';

  projectId = 0;
  userId = 0;

  startDate = '';
  dueDate = '';

  priority = 'Medium';
  status = 'Not Started';

  projects: any[] = [];
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.http.get<any[]>(
      'http://localhost:5190/api/Projects'
    ).subscribe({

      next: (data) => {

        this.projects = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

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

  saveTask() {

    if (
      !this.taskName ||
      !this.description ||
      this.projectId === 0 ||
      this.userId === 0 ||
      !this.startDate ||
      !this.dueDate
    ) {

      alert("Please fill all fields.");
      return;

    }

    const task = {

      taskName: this.taskName,
      description: this.description,

      projectId: this.projectId,
      userId: this.userId,

      startDate: this.startDate,
      dueDate: this.dueDate,

      priority: this.priority,
      status: this.status

    };

    this.http.post(
      'http://localhost:5190/api/TaskItems',
      task
    ).subscribe({

      next: () => {

        alert("Task Added Successfully");

        this.router.navigate(['/tasks']);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to add task.");

      }

    });

  }

}
