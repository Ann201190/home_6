import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-app';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    const token_s: string | any = localStorage.getItem('auth-token')
    if (token_s !== '') {
      this.auth.setToken(token_s)
    }


  }



}
