import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';

import { AccreditedService } from 'app/layout/accredited/services/accredited.service';
import { Accredited } from '../domain/accredited.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AccreditedGenderString } from '../domain/accredited-gender.enum';
import { ToastrService } from 'ngx-toastr';
import { AccreditedUploadFileService } from '../services/accredited.upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { AccreditedTypeEnum } from '../domain/accredited-type.enum';
import { AccreditedStatusEnum } from '../domain/accredited-status.enum';
import { ActionEnum } from '../domain/action.enum';
import { User } from '../../users/domain/user.model';
import { LoginService } from '../../../login/domain/login.service';
import { UzerService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-form-accredited',
  templateUrl: './form.component.html',
  styleUrls: ['../accredited.component.css'],
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
  form: FormGroup;
  elder = true;
  pregnant = false;
  deficient = false;
  children = false;
  id: number;
  private sub: any;
  type = '';
  genderString = AccreditedGenderString;
  value: number;
  onEdit = true;
  title: string;
  user: User;
  accredited: Accredited;

  categories: any[] = [
    { id: 1, name: 'Idoso' },
    { id: 2, name: 'Gestante' },
    { id: 3, name: 'Deficiente' },
    { id: 4, name: 'Criança até 1 ano' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private accreditedService: AccreditedService,
    private uploadService: AccreditedUploadFileService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private userService: UzerService,
    private toastr: ToastrService
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [],
      name: [null, Validators.required],
      genderEnum: AccreditedGenderString.MASCULINO,
      birth_date: [null, Validators.required],
      email: new FormControl(''),
      rg: null,
      cnh: null,
      cpf: [null, Validators.required],
      address: [null, Validators.required],
      neighborhood: [null, Validators.required],
      residential_phone: null,
      city: [null, Validators.required],
      cel_phone: null,
      mothercnh: null,
      fathername: [null],
      fathercnh: null,
      mothername: null,
      childbirth: null,
      typeEnum: [AccreditedTypeEnum.IDOSO],
      namerep: null,
      rgrep: null,
      phonerep: null,
      comment: null,
      statusEnum: [AccreditedStatusEnum.ATIVO],
      action: null,
      changedat: null,
      lastchangeId: null
    });
  }

  ngOnInit() {
    this.title = 'Cadastrar';
    this.user = this.loginService.getCurrentUser();
    this.userService
      .getUserData(this.user.username)
      .subscribe(res => (this.user = res));

    moment.locale('pt-br');

    const id = this.route.params.subscribe(params => {
      const id = params['id'];

      if (!id) {
        return;
      }

      this.accreditedService.getAccredited(id).subscribe(
        accredited => {
          this.onEdit = false;
          this.title = 'Editar';
          this.accredited = accredited;
          this.handleFormTypesOnUpdate();
          this.form.setValue(accredited);
        },
        err => {
          this.toastr.error('Erro!', 'Erro!', { timeOut: 3000 });
        }
      );
    });
  }

  onSubmit() {
    // handleFormStuff
    const type =
      this.type === '' ? AccreditedTypeEnum.IDOSO.toString() : this.type;
    this.form.value.typeEnum = type.toUpperCase();
    const dateFormat = this.form.value.birth_date;
    this.form.value.birth_date = moment(dateFormat).format(
      'YYYY-MM-DDT12:00:00'
    );
    this.form.value.action =
      this.form.value.action === null ? 'CRIADO' : 'ALTERADO';
    this.form.value.lastchangeId = this.user.id;

    if (this.form.valid) {
      this.accreditedService.save(this.form.value).subscribe(
        accredited => {
          this.toastr.success('Crendeciado salvo com sucesso!');
          this.router.navigate(['layout/accredited/lista']);
        },
        err => {
          this.toastr.error('Erro!', 'Erro!', { timeOut: 3000 });
        }
      );
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  cancel() {
    this.router.navigate(['/layout/accredited/lista']);
  }

  handleFormTypes(any) {
    switch (any) {
      case '1':
        this.elder = true;
        this.pregnant = this.deficient = this.children = false;
        this.type = 'IDOSO';
        break;
      case '2':
        this.pregnant = true;
        this.elder = this.deficient = this.children = false;
        this.type = 'GESTANTE';
        break;
      case '3':
        this.deficient = true;
        this.pregnant = this.elder = this.children = false;
        this.type = 'DEFICIENTE';
        break;
      case '4':
        this.children = true;
        this.deficient = this.pregnant = this.elder = false;
        this.type = 'INFANTIL';
        break;
    }
  }

  handleFormTypesOnUpdate() {
    switch (this.accredited.typeEnum) {
      case 'IDOSO':
        this.handleFormTypes('1');
        break;
      case 'GESTANTE':
        this.handleFormTypes('2');
        break;
      case 'DEFICIENTE':
        this.handleFormTypes('3');
        break;
      case 'INFANTIL':
        this.handleFormTypes('4');
        break;
    }
  }

  isFieldValid(field: string) {
    return !this.form.get(field).valid && this.form.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-danger': this.isFieldValid(field),
      'has-warning': this.isFieldValid(field)
    };
  }

  reset() {
    this.form.reset();
  }
}
