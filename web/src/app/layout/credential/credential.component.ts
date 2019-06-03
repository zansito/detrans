import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Credential } from './domain/credential.model';
import { CredentialService } from './service/credential.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Accredited } from '../accredited/domain/accredited.model';
import { AccreditedService } from '../accredited/services/accredited.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss'],
  animations: [routerTransition()]
})
export class CredentialComponent implements OnInit {
  private loaded;

  constructor() {
  }

  ngOnInit() {
  }

  loadMyChildComponent() {
    this.loaded = true;
  }

  save() {
  }

}
