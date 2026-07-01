import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-task.html',
  styleUrls: ['./edit-task.css']
})
export class EditTaskComponent implements OnInit {

  taskItemId = 0;

  taskName = '';
  description = '';

  startDate = '';
  dueDate = '';

  priority = 'Medium';
  status = 'Not Started';

  projectId = 0;
  userId = 0;

  projects: any[] = [];
  users: any[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.taskItemId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.loadProjects();
    this.loadUsers();
    this.loadTask();

  }

  loadProjects() {

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

  }

  loadUsers() {

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

  loadTask() {

    this.http.get<any>(
      `http://localhost:5190/api/TaskItems/${this.taskItemId}`
    ).subscribe({

      next: (data) => {

        this.taskName = data.taskName;
        this.description = data.description;

        this.startDate = data.startDate.substring(0, 10);
        this.dueDate = data.dueDate.substring(0, 10);

        this.priority = data.priority;
        this.status = data.status;

        this.projectId = data.projectId;
        this.userId = data.userId;

      },

      error: (err) => {

        console.log(err);

        alert("Unable to load task.");

        this.router.navigate(['/tasks']);

      }

    });

  }

  updateTask() {

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

      taskItemId: this.taskItemId,

      taskName: this.taskName,
      description: this.description,

      projectId: this.projectId,
      userId: this.userId,

      startDate: this.startDate,
      dueDate: this.dueDate,

      priority: this.priority,
      status: this.status

    };

    this.http.put(
      `http://localhost:5190/api/TaskItems/${this.taskItemId}`,
      task
    ).subscribe({

      next: () => {

        alert("Task Updated Successfully");

        this.router.navigate(['/tasks']);

      },

      error: (err) => {

        console.log(err);

        alert("Unable to update task.");

      }

    });

  }

}
