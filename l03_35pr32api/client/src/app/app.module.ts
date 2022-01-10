import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/token.interceptor';
import { MainComponentComponent } from './main-component/main-component.component';
import { PartnersComponentComponent } from './partners-component/partners-component.component';
import { ErrorComponent } from './error/error/error.component';
import { PhonesComponentComponent } from './categories-component/phones-component.component';
import { PhonesFormComponent } from './categories-component/phones-form/phones-form.component';
import { OnephoneComponentComponent } from './categories-component/onephone-component/onephone-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterComponent,
    MainComponentComponent,
    PhonesComponentComponent,
    PartnersComponentComponent,
    ErrorComponent,
    PhonesFormComponent,
    OnephoneComponentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{

    provide: HTTP_INTERCEPTORS,

    useClass: TokenInterceptor,

    multi: true

  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
