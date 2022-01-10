import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  aSub!: Subscription;


  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {

      if (params['registered']) {
        MaterialService.toast('Теперь Вы можете зайти в систему, используя свои данные регистрации!!')
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе')
      }

      else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заного')
      }

    });
  }

  onSubmit() {
    console.log(this.form.value)


    this.aSub = this.auth.login(this.form.value).subscribe(
      () => {
        //   console.log('Login done!!!!') 
        this.router.navigate(['/work/main'])
      },
      (error) => {
        //    console.log('Login error!!!')
        MaterialService.toast(error.message);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
