import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent implements OnInit {

  name = '';
  role = '';
  email = '';

  showSearch = false;
  showNotification = false;
  showSettings = false;

  searchText = '';

  users: any[] = [];
  projects: any[] = [];
  tasks: any[] = [];

  filteredUsers: any[] = [];
  filteredProjects: any[] = [];
  filteredTasks: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.name = localStorage.getItem('name') || 'HR Admin';
    this.role = localStorage.getItem('role') || 'Admin';
    this.email = localStorage.getItem('email') || '';

    this.loadData();

  }

  loadData() {

    this.http.get<any[]>('http://localhost:5190/api/Users')
      .subscribe(data => {

        this.users = data;
        this.filteredUsers = data;

      });

    this.http.get<any[]>('http://localhost:5190/api/Projects')
      .subscribe(data => {

        this.projects = data;
        this.filteredProjects = data;

      });

    this.http.get<any[]>('http://localhost:5190/api/TaskItems')
      .subscribe(data => {

        this.tasks = data;
        this.filteredTasks = data;

      });

  }

  toggleSearch() {

    this.showSearch = !this.showSearch;

    this.showNotification = false;
    this.showSettings = false;

    this.searchText = '';

    this.filteredUsers = this.users;
    this.filteredProjects = this.projects;
    this.filteredTasks = this.tasks;

  }

  search() {

    const txt = this.searchText.toLowerCase();

    this.filteredUsers = this.users.filter(x =>
      x.fullName.toLowerCase().includes(txt) ||
      x.email.toLowerCase().includes(txt) ||
      x.username.toLowerCase().includes(txt)
    );

    this.filteredProjects = this.projects.filter(x =>
      x.projectName.toLowerCase().includes(txt)
    );

    this.filteredTasks = this.tasks.filter(x =>
      x.taskName.toLowerCase().includes(txt)
    );

  }

  openUsers() {

    this.showSearch = false;
    this.router.navigate(['/users']);

  }

  openProjects() {

    this.showSearch = false;
    this.router.navigate(['/projects']);

  }

  openTasks() {

    this.showSearch = false;
    this.router.navigate(['/tasks']);

  }

  toggleNotification() {

    this.showNotification = !this.showNotification;

    this.showSearch = false;
    this.showSettings = false;

  }

  toggleSettings() {

    this.showSettings = !this.showSettings;

    this.showNotification = false;
    this.showSearch = false;

  }

  logout() {

    localStorage.clear();

    this.router.navigate(['/']);

  }

}
