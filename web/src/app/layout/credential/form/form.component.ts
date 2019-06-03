import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { routerTransition } from '../../../router.animations';

import * as moment from 'moment';
import { CredentialService } from '../service/credential.service';
import { ToastrService } from 'ngx-toastr';
import { Accredited } from '../../accredited/domain/accredited.model';
import { AccreditedService } from '../../accredited/services/accredited.service';
import { Credential } from '../domain/credential.model';
import { LoginService } from '../../../login/domain/login.service';
import { UzerService } from 'app/shared/services/user.service';

@Component({
  selector: 'app-form-credential',
  templateUrl: './form.component.html',
  animations: [routerTransition()],
  styleUrls: ['./form.component.scss'],
  providers: [UzerService]
})
export class FormComponent implements OnInit {
  credentialForm: FormGroup;
  today: number = Date.now();
  id: number;
  accredited: Accredited;
  accreditedId: number;
  credential: Credential;
  user;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private credentialService: CredentialService,
    private accreditedService: AccreditedService,
    private loginService: LoginService,
    private userService: UzerService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  ngOnInit() {
    moment.locale('pt-br');

    this.user = this.loginService.getCurrentUser();
    this.userService
      .getUserData(this.user.username)
      .subscribe(res => (this.user = res));

    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        return;
      }

      this.accreditedService.getAccredited(this.id).subscribe(
        accredited => {
          this.accredited = accredited;
          this.accreditedId = accredited.id;
        },
        err => {
          this.toastr.error('Alguma coisa deu errado!', 'Erro!', {
            timeOut: 3000
          });
        }
      );
    });

    this.credentialService.getCredential(this.id).subscribe(
      res => {
        this.credential = res[0];
        this.credentialForm.setValue(this.credential);
      },
      err => {
        this.toastr.error('Alguma coisa deu errado!', 'Erro!', {
          timeOut: 3000
        });
      }
    );
  }

  createForm() {
    this.credentialForm = this.fb.group({
      id: null,
      expireDate: ['', Validators.required],
      emissionDate: ['', Validators.required],
      register: ['', Validators.required],
      documentNumber: ['', Validators.required],
      accredited: '',
      fileName: '',
      action: '',
      lastchangeId: null
    });
  }

  onSubmit() {
    if (this.credentialForm.valid) {
      const dateFormat = this.credentialForm.value.expireDate;
      this.credentialForm.value.expireDate = moment(dateFormat).format(
        'YYYY-MM-DD'
      );
      this.credentialForm.value.action =
        this.credentialForm.value.action === '' ? 'CRIADO' : 'ALTERADO';
      const form = this.credentialForm.value;
      this.credentialForm.value.lastchangeId = this.user.id;

      const payload = Object.assign({}, form);
      payload.accredited = this.accredited;

      this.credentialService.generatePdf(payload).subscribe(
        credential => {
          this.toastr.success('Crendecial salva com sucesso!');
          this.router.navigate(['layout/credencial/view/', this.accreditedId]);
        },
        err => {
          this.toastr.error('Erro!', 'Erro!', { timeOut: 3000 });
        }
      );
    } else {
      this.validateAllFormFields(this.credentialForm);
    }
  }

  validateAllFormFields(credentialForm: FormGroup) {
    Object.keys(credentialForm.controls).forEach(field => {
      const control = credentialForm.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  isFieldValid(field: string) {
    return !this.credentialForm.get(field).valid && this.credentialForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-danger': this.isFieldValid(field),
      'has-warning': this.isFieldValid(field)
    };
  }

  back() {
    this.router.navigate(['layout/credencial/view/', this.accreditedId]);
  }
}
