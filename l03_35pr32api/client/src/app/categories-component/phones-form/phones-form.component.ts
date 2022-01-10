import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Phone } from 'src/app/models/phone';
import { PhonesService } from 'src/app/services/phones.service';
import { MaterialService } from 'src/app/services/material.service';


@Component({
  selector: 'app-phones-form',
  templateUrl: './phones-form.component.html',
  styleUrls: ['./phones-form.component.css']
})
export class PhonesFormComponent implements OnInit {
  isNew = true;
  form!: FormGroup;
  id!: string;

  constructor(private route: ActivatedRoute, private router: Router, private phonesService: PhonesService) { }

  ngOnInit(): void {

    this.form = new FormGroup({

      typePhone: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      vendor: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      model: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.min(100)]),
      img: new FormControl('', [Validators.maxLength(255)]),
      count: new FormControl('', [Validators.min(1)]),
      vendorEmail: new FormControl('', [Validators.email, Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)])
    })


    this.route.params.pipe(

      switchMap((params: Params) => {

        if (params['id']) {

          this.isNew = false
          this.id = params['id']
          console.log(this.id)
          return this.phonesService.getById(params['id'])

        }
        return of(null)

      })

    ).subscribe(phone => {

      if (phone) {

        this.form.patchValue({

          typePhone: phone.typePhone,
          vendor: phone.vendor,
          model: phone.model,
          price: phone.price,
          img: phone.img,
          count: phone.count,
          vendorEmail: phone.vendorEmail,
          description: phone.description

        })
        MaterialService.updateTextInputs()

      }

    })

  }


  deletePhone() {
    this.phonesService.delete(this.id)
      .subscribe(() => {
        MaterialService.toast('Данные удалены')
        this.router.navigate(['/work/phones']);
      })

  }

  onSubmit() {
    const onePhone: Phone = {

      typePhone: this.form.controls['typePhone'].value,
      vendor: this.form.controls['vendor'].value,
      model: this.form.controls['model'].value,
      price: this.form.controls['price'].value,
      img: this.form.controls['img'].value,
      count: this.form.controls['count'].value,
      vendorEmail: this.form.controls['vendorEmail'].value,
      description: this.form.controls['description'].value,
    }


    if (this.isNew) {
      this.phonesService.create(onePhone)
        .subscribe(() => {
          MaterialService.toast('Данные добавлены')
          this.router.navigate(['/work/phones']);
        })

    } else {
      this.phonesService.update(this.id, onePhone)
        .subscribe(() => {
          MaterialService.toast('Данные изменены')
          this.router.navigate(['/work/phones'])
        })
    }
  }
}
