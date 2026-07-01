import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { ForgotPasswordComponent } from './forgot-password/forgot-password';

import { LayoutComponent } from './layout/layout';
import { DashboardComponent } from './dashboard/dashboard';

import { UserListComponent } from './user-list/user-list';
import { AddUser } from './add-user/add-user';
import { EditUser } from './edit-user/edit-user';

import { ProjectListComponent } from './project-list/project-list';
import { AddProjectComponent } from './add-project/add-project';
import { EditProjectComponent } from './edit-project/edit-project';

import { TaskListComponent } from './task-list/task-list';
import { AddTaskComponent } from './add-task/add-task';
import { EditTaskComponent } from './edit-task/edit-task';

import { ReportsComponent } from './reports/reports';

export const routes: Routes = [

  // Login
  {
    path: '',
    component: LoginComponent
  },

  // Forgot Password
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },

  // Main Layout
  {
    path: '',
    component: LayoutComponent,

    children: [

      // Dashboard
      {
        path: 'dashboard',
        component: DashboardComponent
      },

      // ======================
      // USERS
      // ======================

      {
        path: 'users',
        component: UserListComponent
      },

      {
        path: 'add-user',
        component: AddUser
      },

      {
        path: 'edit-user/:id',
        component: EditUser
      },

      // ======================
      // PROJECTS
      // ======================

      {
        path: 'projects',
        component: ProjectListComponent
      },

      {
        path: 'add-project',
        component: AddProjectComponent
      },

      {
        path: 'edit-project/:id',
        component: EditProjectComponent
      },

      // ======================
      // TASKS
      // ======================

      {
        path: 'tasks',
        component: TaskListComponent
      },

      {
        path: 'add-task',
        component: AddTaskComponent
      },

      {
        path: 'edit-task/:id',
        component: EditTaskComponent
      },

      // ======================
      // REPORTS
      // ======================

      {
        path: 'reports',
        component: ReportsComponent
      }

    ]
  },

  // Invalid Route
  {
    path: '**',
    redirectTo: ''
  }

];
