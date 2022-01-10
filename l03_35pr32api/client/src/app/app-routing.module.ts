import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { PartnersComponentComponent } from './partners-component/partners-component.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { ErrorComponent } from './error/error/error.component';
import { PhonesComponentComponent } from './categories-component/phones-component.component';
import { PhonesFormComponent } from './categories-component/phones-form/phones-form.component';
import { OnephoneComponentComponent } from './categories-component/onephone-component/onephone-component.component';


const routes: Routes = [
  {
    path: 'auth', component: AuthLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: 'work', component: SiteLayoutComponent, canActivate: [AuthGuardService], children: [
      { path: 'main', component: MainComponentComponent },
      { path: 'phones', component: PhonesComponentComponent },
      { path: 'partner', component: PartnersComponentComponent },
      { path: 'phones/new', component: PhonesFormComponent },
      { path: 'phones/:id', component: PhonesFormComponent },
      { path: 'onephone/:id', component: OnephoneComponentComponent },
    ]
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
