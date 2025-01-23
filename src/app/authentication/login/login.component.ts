import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    "Emailaddress": "",
    "Password": ""   
  };
    
  http = inject(HttpClient); //For New Veersion of Angular 19.0.4
  constructor( private router: Router) { }

  onLogin() {
    debugger;
      this.http.post("http://localhost:5089/api/Authenticate/login", this.loginObj, { responseType: 'text' }).subscribe({
        next: (res: string) => {
          const jwtToken = res;
          localStorage.setItem("jwtToken",jwtToken);
          alert('Login Success');
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          if (error.status === 404) {
            alert('Invalid User');
          } else {
            alert('An unexpected error occurred');
          }
        }
      });
    }
  }
  
