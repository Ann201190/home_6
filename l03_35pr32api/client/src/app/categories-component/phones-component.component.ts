import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../models/phone';
import { PhonesService } from '../services/phones.service';

@Component({
  selector: 'app-phones-component',
  templateUrl: './phones-component.component.html',
  styleUrls: ['./phones-component.component.css']
})
export class PhonesComponentComponent implements OnInit {

  phones: Phone[] = []

  constructor(private phonesService: PhonesService, private router: Router) { }

  ngOnInit(): void {
    this.phonesService.fetch().subscribe(items => {
      this.phones = items
      console.log(this.phones)
    })
  }

  goOnePhone(id: string | undefined) {
    this.router.navigate([`/work/onephone/${id}`]);
  }

  goUpdatePhone(id: string | undefined) {
    this.router.navigate([`/work/phones/${id}`]);
  }

}
