import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef!: ElementRef

  links = [

    { url: '/work/main', name: 'Главная' },
    { url: '/work/phones', name: 'Телефоны' },
    { url: '/work/partner', name: 'Партнеры' }

  ]


  constructor(private auth: AuthService, private router: Router) { }



  ngAfterViewInit(): void {

    MaterialService.initializeFloatingButton(this.floatingRef)

  }

  ngOnInit(): void {
  }

  logout(event: Event) {



    this.auth.logout()

    this.router.navigate(['/auth/login'])

  }

}
