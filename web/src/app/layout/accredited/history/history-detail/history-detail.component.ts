import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccreditedService } from '../../services/accredited.service';
import { Accredited } from '../../domain/accredited.model';
import { CustomDatePipe } from '../custom-date.pipe';
import { AccreditedHistory } from '../../domain/accredited-history.model';
import * as moment from 'moment';
import { UserService } from '../../../users/domain/user.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  providers: [CustomDatePipe, UserService]
})
export class HistoryDetailComponent implements OnInit {
  userid: number;
  accreditedid: number;
  currentAccredited: AccreditedHistory;
  pastAccredited: AccreditedHistory;
  newdate;
  prevId;
  errvar = '';
  changedat: string | Date;
  userName;

  constructor(
    private route: ActivatedRoute,
    private accreditedService: AccreditedService,
    private customDatePipe: CustomDatePipe,
    private userService: UserService
  ) {
    const id = this.route.params.subscribe(params => {
      this.userid = params['id'];
      this.accreditedid = params['historyid'];
      this.prevId = params['prevId'];
    });
  }

  ngOnInit() {
    this.accreditedService
      .getHistoryDetail(this.accreditedid)
      .map(res => {
        this.currentAccredited = res;
        this.getUser(this.currentAccredited.lastchangeId);
        this.changedat = this.customDatePipe.transform(
          this.currentAccredited.changedat
        );
        this.compareObjects(res, this.pastAccredited);
      })
      .subscribe();

    this.handlePrev();
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.userName = user[4];
    },
      err => {
        console.log('erro')
      })
  }

  handlePrev() {
    if (this.prevId !== '0') {
      this.accreditedService.getHistoryDetail(this.prevId).subscribe(res => {
        this.pastAccredited = res;
      });
    } else {
      this.accreditedService.getAccredited(this.userid).subscribe(res => {
        this.pastAccredited = res;
      });
    }
  }
  compareObjects(res, res2) {
    const diff = {};

    setTimeout(() => {
      if (res.name !== this.pastAccredited.name) {
        this.errvar += `<p>Nome foi alterado de <b>${
          this.pastAccredited.name
          }</b> para <b>${res.name}</b></p>`;
      }

      if (res.address !== this.pastAccredited.address) {
        this.errvar += `<p class="margin-t">Endereço foi alterado
      de <b>${this.pastAccredited.address}</b> para <b>${res.address}</b></p>`;
      }

      if (res.birth_date !== this.pastAccredited.birth_date) {
        this.errvar += `<p class="margin-text">Data de nascimento foi
      alterada de <b>${moment(this.pastAccredited.birth_date).format(
            'DD/MM/YYYY'
          )}
      </b> para <b>${moment(res.birth_date).format('DD/MM/YYYY')}</b></p>`;
      }

      if (res.city !== this.pastAccredited.city) {
        this.errvar += `<p class="margin-text">Cidade foi
      alterada de <b>${this.pastAccredited.city}</b> para <b>${
          res.city
          }</b></p>`;
      }

      if (res.cnh !== this.pastAccredited.cnh) {
        this.errvar += `<p class="margin-text">CNH foi
      alterada de <b>${this.pastAccredited.cnh}</b> para <b>${res.cnh}</b></p>`;
      }

      if (res.gender !== this.pastAccredited.gender) {
        this.errvar += `<p class="margin-text">Sexo foi
      alterado de <b>${this.pastAccredited.gender}</b> para <b>${
          res.gender
          }</b></p>`;
      }

      if (res.neighborhood !== this.pastAccredited.neighborhood) {
        this.errvar += `<p class="margin-text">Bairro foi
      alterado de <b>${this.pastAccredited.neighborhood}</b> para <b>${
          res.neighborhood
          }</b></p>`;
      }

      if (res.residential_phone !== this.pastAccredited.residential_phone) {
        this.errvar += `<p class="margin-text">Telefone residencial foi
      alterado de <b>${this.pastAccredited.residential_phone}</b> para <b>${
          res.residential_phone
          }</b></p>`;
      }

      if (res.rg !== this.pastAccredited.rg) {
        this.errvar += `<p class="margin-text">RG foi
      alterado de <b>${this.pastAccredited.rg}</b> para <b>${res.rg}</b></p>`;
      }

      if (res.mothercnh !== this.pastAccredited.mothercnh) {
        this.errvar += `<p class="margin-text">CNH da mãe foi
      alterado de <b>${this.pastAccredited.mothercnh}</b> para <b>${
          res.mothercnh
          }</b></p>`;
      }

      if (res.email !== this.pastAccredited.email) {
        this.errvar += `<p class="margin-text">E-mail foi
      alterado de <b>${this.pastAccredited.email}</b> para <b>${
          res.email
          }</b></p>`;
      }

      if (res.namerep !== this.pastAccredited.namerep) {
        this.errvar += `<p class="margin-text">Nome do representante foi
      alterado de <b>${
          this.pastAccredited.namerep !== null
            ? this.pastAccredited.namerep
            : 'valor nulo'
          }</b> para <b>${res.namerep}</b></p>`;
      }

      if (res.rgrep !== this.pastAccredited.rgrep) {
        this.errvar += `<p class="margin-text">RG do representante foi
      alterado de <b>${
          this.pastAccredited.rgrep !== null
            ? this.pastAccredited.rgrep
            : 'valor nulo'
          }</b> para <b>${res.rgrep}</b></p>`;
      }

      if (res.phonerep !== this.pastAccredited.phonerep) {
        this.errvar += `<p class="margin-text">Fone do representante foi
      alterado de <b>${
          this.pastAccredited.phonerep !== null
            ? this.pastAccredited.phonerep
            : 'valor nulo'
          }</b> para <b>${res.phonerep}</b></p>`;
      }
    }, 1000);
  }
  cancel() {
    window.history.back();
  }
}
