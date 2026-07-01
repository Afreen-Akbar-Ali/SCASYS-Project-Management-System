import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {

  tasks: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {

    this.http.get<any[]>(
      'http://localhost:5190/api/TaskItems'
    ).subscribe({

      next: (data) => {

        console.log("Tasks:", data);

        this.tasks = [...data];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  deleteTask(id: number): void {

    if (!confirm("Delete this task?")) {
      return;
    }

    this.http.delete(
      `http://localhost:5190/api/TaskItems/${id}`
    ).subscribe({

      next: () => {

        alert("Task Deleted");

        this.loadTasks();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
