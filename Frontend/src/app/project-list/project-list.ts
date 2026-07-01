import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-list.html',
  styleUrls: ['./project-list.css']
})
export class ProjectListComponent implements OnInit {

  projects: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {

    this.http.get<any[]>(
      'http://localhost:5190/api/Projects'
    ).subscribe({

      next: (data) => {

        console.log("Projects:", data);

        this.projects = [...data];

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  deleteProject(id: number): void {

    if (!confirm("Delete this project?")) {
      return;
    }

    this.http.delete(
      `http://localhost:5190/api/Projects/${id}`
    ).subscribe({

      next: () => {

        alert("Project Deleted");

        this.loadProjects();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
