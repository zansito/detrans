import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { routerTransition } from '../router.animations';
import { LoginService } from './domain/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private toastr: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: '',
      password: ''
    })
  }

  login() {
    this.loading = true;
    this.loginService.login(this.loginForm.value)
      .subscribe(result => {
        if (result === true) {
          // login successful
          this.router.navigate(['layout/dashboard']);
        } else {
          // login failed
          this.error = 'Senha ou usuário incorretos!';
          this.loading = false;
        }
      }, error => {
        this.toastr.error('Senha ou usuário incorreto!', 'Erro!', { timeOut: 3000 });
        this.loading = false;
        this.error = error;
      });
  }

  redirectToForgot() {
    this.router.navigate(['forgot']);
  }
}
