import {Component, OnInit} from '@angular/core';
import {routerTransition} from '../../router.animations';
import {Router} from '@angular/router';

@Component({
  selector: 'app-credentials',
  templateUrl: './accredited.component.html',
  styleUrls: ['./accredited.component.css'],
  animations: [routerTransition()]
})

export class AccreditedComponent implements OnInit {
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
