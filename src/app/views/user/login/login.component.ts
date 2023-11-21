import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = '';
  passwordModel = '';

  buttonDisabled = false;
  buttonState = '';

  constructor(private authService: AuthService, private notifications: NotificationsService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    if (!this.loginForm.valid || this.buttonDisabled) {
      return;
    }
    this.buttonDisabled = true;
    this.buttonState = 'show-spinner';

    this.authService.signIn(this.loginForm.value).subscribe((user) => {
      localStorage.setItem("email", user.user.email)
      this.dataService.insert_doc("Inicio de sesion",{usuario:user.user.email,pagina:"login"}).subscribe((user)=>{})
      this.router.navigate(['/']);
    }, (error) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    });
  }
  login() {
    this.authService.signInGoogle().subscribe((user) => {
      if(user.user.email.includes("tecsup") || user.user.email =="alejandro.aguirre.k@gmail.com"){

        localStorage.setItem("email", user.user.email)

        this.router.navigate(['/']);
      }else{
        this.notifications.create('Error', "Inicia sesión con tu correo institucional", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
      }
    }, (error) => {
      this.buttonDisabled = false;
      this.buttonState = '';
      this.notifications.create('Error', error.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
    });
  }
}
