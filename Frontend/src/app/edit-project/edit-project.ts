import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './edit-project.html',
  styleUrls: ['./edit-project.css']
})
export class EditProjectComponent implements OnInit {

  projectId = 0;

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.projectId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any[]>(
      'http://localhost:5190/api/Users'
    ).subscribe(data => {

      this.users = data.filter(x => x.role === 'Employee');

    });

    this.http.get<any>(
      `http://localhost:5190/api/Projects/${this.projectId}`
    ).subscribe(data => {

      this.projectName = data.projectName;
      this.description = data.description;

      this.startDate = data.startDate.substring(0, 10);
      this.dueDate = data.dueDate.substring(0, 10);

      this.priority = data.priority;
      this.status = data.status;

      this.userId = data.userId;

    });

  }

  updateProject() {

    const project = {

      projectId: this.projectId,

      projectName: this.projectName,
      description: this.description,

      startDate: this.startDate,
      dueDate: this.dueDate,

      priority: this.priority,
      status: this.status,

      userId: this.userId

    };

    this.http.put(
      `http://localhost:5190/api/Projects/${this.projectId}`,
      project
    ).subscribe({

      next: () => {

        alert("Project Updated Successfully");

        this.router.navigate(['/projects']);

      },

      error: err => {

        console.log(err);
        alert("Unable to update project.");

      }

    });

  }

}
