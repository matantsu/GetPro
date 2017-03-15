import { EditUserComponent } from './views/edit-user';
import { JobPageComponent } from './views/job-page';
import { HomePageComponent } from './views/home-page';
import { PostJobComponent } from './views/post-job';
import { LoginComponent } from './views/login';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'post',      component: PostJobComponent },
  { path: 'edit',      component: EditUserComponent },
  { path: 'job/:jobId',      component: JobPageComponent },
  { path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  //{ path: 'job/:jobId',      component: JobsPageComponent },
];
