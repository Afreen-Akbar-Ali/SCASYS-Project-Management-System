import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrls: ['./reports.css']
})
export class ReportsComponent implements OnInit {

  totalUsers = 0;
  totalProjects = 0;
  totalTasks = 0;

  completed = 0;
  progress = 0;
  pending = 0;

  workloads: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.loadUsers();
    this.loadProjects();
    this.loadTasks();
    this.loadEmployeeWorkload();

  }

  loadUsers() {

    this.http.get<any[]>(
      'http://localhost:5190/api/Users'
    ).subscribe({

      next: (data) => {

        console.log("Users:", data);

        this.totalUsers = data.length;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  loadProjects() {

    this.http.get<any[]>(
      'http://localhost:5190/api/Projects'
    ).subscribe({

      next: (data) => {

        console.log("Projects:", data);

        this.totalProjects = data.length;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  loadTasks() {

    this.http.get<any[]>(
      'http://localhost:5190/api/TaskItems'
    ).subscribe({

      next: (data) => {

        console.log("Tasks:", data);

        this.totalTasks = data.length;

        this.completed =
          data.filter(x => x.status === "Completed").length;

        this.progress =
          data.filter(x => x.status === "In Progress").length;

        this.pending =
          data.filter(x => x.status === "Not Started").length;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  loadEmployeeWorkload() {

    this.http.get<any[]>(
      'http://localhost:5190/api/Dashboard/EmployeeWorkload'
    ).subscribe({

      next: (data) => {

        console.log("Employee Workload:", data);

        this.workloads = data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
