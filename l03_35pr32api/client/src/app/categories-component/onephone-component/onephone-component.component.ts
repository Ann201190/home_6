import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Phone } from 'src/app/models/phone';
import { PhonesService } from 'src/app/services/phones.service';

@Component({
  selector: 'app-onephone-component',
  templateUrl: './onephone-component.component.html',
  styleUrls: ['./onephone-component.component.css']
})
export class OnephoneComponentComponent implements OnInit {
  public phone?: Phone;
  photoVisible: boolean = false;
  emailVendorVisible: boolean = false;
  descriptionVisible: boolean = false;
  descriptionVendorVisible: boolean = false;

  constructor(public data: PhonesService, public route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.data.getById(params["id"]).subscribe(phone => this.phone = phone);
    })
  }

  goAllProduct() {
    this.router.navigate(['/work/phones']);
  }

  mouseEnterEmail() {
    this.emailVendorVisible = true;
  }

  mouseLeaveEmail() {
    this.emailVendorVisible = false;
  }

  mouseEnterDescription() {
    this.descriptionVendorVisible = true;
  }

  mouseLeaveDescription() {
    this.descriptionVendorVisible = false;
  }

}
