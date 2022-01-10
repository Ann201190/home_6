import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form!: FormGroup
  aSub!: Subscription;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit() {

    console.log(this.form.value)

    this.aSub = this.auth.register(this.form.value).subscribe(

      () => {
        // MaterialService.toast('Register done!!!')
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
        //console.log('Register done!!!!')
      },

      () => {
        MaterialService.toast('Register error!!!')
        ///console.log('Register error!!!')
      }
    )
  }


  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
