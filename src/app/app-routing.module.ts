import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  /* LOGIN */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AppComponent
      },
         /* PAGE NOT FOUND */
      {
        path: '**', component: PageNotFoundComponent
      }
    ]
  },

   /* PAGE NOT FOUND */
  {
    path: '**', component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
