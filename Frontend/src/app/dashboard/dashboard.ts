import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  totalProjects = 0;
  totalTasks = 0;

  completedTasks = 0;
  inProgressTasks = 0;
  notStartedTasks = 0;

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

    this.http.get<any[]>('http://localhost:5190/api/Users')
      .subscribe(data => {

        this.totalUsers = data.length;

      });

  }

  loadProjects() {

    this.http.get<any[]>('http://localhost:5190/api/Projects')
      .subscribe(data => {

        this.totalProjects = data.length;

      });

  }

  loadTasks() {

    this.http.get<any[]>('http://localhost:5190/api/TaskItems')
      .subscribe(data => {

        this.totalTasks = data.length;

        this.completedTasks =
          data.filter(x => x.status === 'Completed').length;

        this.inProgressTasks =
          data.filter(x => x.status === 'In Progress').length;

        this.notStartedTasks =
          data.filter(x => x.status === 'Not Started').length;

        this.createChart();

      });

  }

  loadEmployeeWorkload() {

    console.log("Loading Employee Workload...");

    this.http.get<any[]>(
      'http://localhost:5190/api/Dashboard/EmployeeWorkload'
    ).subscribe({

      next: (data) => {

        console.log("Employee Workload:", data);

        this.workloads = data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  createChart() {

    const oldChart = Chart.getChart("taskChart");

    if (oldChart) {
      oldChart.destroy();
    }

    new Chart("taskChart", {

      type: 'pie',

      data: {

        labels: [
          'Completed',
          'In Progress',
          'Not Started'
        ],

        datasets: [{

          data: [
            this.completedTasks,
            this.inProgressTasks,
            this.notStartedTasks
          ]

        }]

      }

    });

  }

}
