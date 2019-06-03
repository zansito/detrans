import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { routerTransition } from 'app/router.animations';
import { UserService } from '../domain/user.service';
import { LoginService } from 'app/login/domain/login.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../domain/user.model';
import { AccreditedStatusEnum } from '../../accredited/domain/accredited-status.enum';
import { UserAuthority } from '../domain/user.authority';
import { PasswordValidation } from './password-validator';

@Component({
  selector: 'app-form-users',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {

  userForm: FormGroup;
  user: User;
  onEdit: boolean;
  title: string;

  categories: any[] = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'Normal' }
  ];

  @ViewChild('passwordConfirm') passwordConfirm: ElementRef;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    const id = this.route.params.subscribe(params => {
      this.createForm();
      const id = params['id'];

      if (!id) { return };

      this.userService.getUserById(id).subscribe(user => {

        this.user = this.bind2Model(user);

        this.userForm.setValue(this.user);
        this.onEdit = false;
      },
        err => {
          this.toastr.error('Erro!', 'Erro!', { timeOut: 3000 });
        })
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      id: '',
      name: [null, Validators.required],
      email: [null, Validators.required],
      username: [null, Validators.required],
      password: ['', Validators.required],
      enabled: [true, Validators.required],
      lastPasswordResetDate: new Date('1999-12-12 12:12:12'),
      admin: [null, Validators.required]
    });
  }

  onSubmit(form) {

    this.userForm.updateValueAndValidity();
    this.userForm.markAsTouched();


    if (this.userForm.valid) {

      this.userService.createUser(this.userForm.value).subscribe(
        user => {
          this.toastr.success('Usuário salvo com sucesso!');
          this.router.navigate(['/layout/users']);
        },
        err => {
          this.toastr.error('Erro!', 'Erro!', { timeOut: 3000 });
        }
      );
    } else {
      this.validateAllFormFields(this.userForm);
    }

  }

  validateAllFormFields(userForm: FormGroup) {
    Object.keys(userForm.controls).forEach(field => {
      const control = userForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  cancel() {
    this.router.navigate(['layout/users/']);
  }

  bind2Model(user): User {
    const uzer = new User();
    const authorita = new UserAuthority()

    uzer.id = user[0];
    uzer.email = user[1];
    uzer.enabled = user[2];
    uzer.lastPasswordResetDate = user[3];
    uzer.password = user[5];
    uzer.username = user[6];
    uzer.name = user[4];
    uzer.admin = user[7];
    authorita.user_id = user[7];
    authorita.authority_id = user[8];

    Object.assign(uzer, authorita)

    return uzer
  }

  isFieldValid(field: string) {
    return !this.userForm.get(field).valid && this.userForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-danger': this.isFieldValid(field),
      'has-warning': this.isFieldValid(field)
    };
  }
}
