import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { ForgotService } from '../forgot.service';
import { UserService } from 'app/layout/users/domain/user.service';
import { ResetService } from './reset.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'password-forgot',
  templateUrl: 'reset.component.html',
  styleUrls: ['../../login.component.scss']
})
export class ResetComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  error = '';
  private token: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private forgotService: ForgotService,
    private reset: ResetService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createForm();

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });

  }

  createForm() {
    this.loginForm = this.fb.group({
      password: ''
    });
  }

  changePassword() {

    this.reset
      .findByTokenAndChangePassword(this.loginForm.value.password, this.token).map(res => {
        this.toastr.success('',
          'Senha alterada  com sucesso!',
          { timeOut: 20000 });
        this.router.navigate(['../'])
      }, err => {
        this.toastr.success('',
          'Erro ao alterar senha',
          { timeOut: 20000 });
      }
      )
      .subscribe();
  }

}

