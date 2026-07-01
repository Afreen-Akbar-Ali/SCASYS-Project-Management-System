import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {

    this.http.get<any[]>(
      'http://localhost:5190/api/Users'
    ).subscribe({

      next: (data) => {

        this.users = data;

        this.cdr.detectChanges();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  deleteUser(id: number) {

    if (!confirm("Delete this employee?"))
      return;

    this.http.delete(
      `http://localhost:5190/api/Users/${id}`
    ).subscribe({

      next: () => {

        alert("Employee Deleted Successfully");

        this.loadUsers();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
