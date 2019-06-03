import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../domain/login.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../layout/users/domain/user.service';
import { ForgotService } from './forgot.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'password-forgot',
  templateUrl: 'forgot.component.html',
  styleUrls: ['../login.component.scss']
})

export class ForgotComponent implements OnInit {
  loginForm: FormGroup
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgotService: ForgotService,
    private userService: UserService,
    private toastr: ToastrService) {
    this.createForm();
  }

  ngOnInit() {
    // reset login status

  }

  createForm() {
    this.loginForm = this.fb.group({
      email: '',
    })
  }

  back() {
    this.router.navigate(['../']);
  }

  sendMail() {
    this.forgotService
      .findByMail(this.loginForm.controls['email'].value).map(res => {
        this.toastr.success('',
          'E-mail enviado com sucesso!',
          { timeOut: 20000 });
      }, err => {
        this.toastr.success('',
          'E-mail enviado com sucesso!',
          { timeOut: 20000 });
      })
      .subscribe();
  }
}

