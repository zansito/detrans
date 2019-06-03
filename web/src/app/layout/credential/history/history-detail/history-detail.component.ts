import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { CustomDatePipe } from '../../../accredited/history/custom-date.pipe';
import { CredentialHistory } from '../../domain/credential.history';
import { CredentialService } from '../../service/credential.service';
import { UserService } from '../../../users/domain/user.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  providers: [CustomDatePipe]
})
export class HistoryDetailComponent implements OnInit {
  userid: number;
  credentialid: number;
  currentCredential: CredentialHistory;
  pastCredential: CredentialHistory;
  newdate;
  prevId;
  currentid;
  errvar = '';
  changedat;
  userName;

  constructor(
    private route: ActivatedRoute,
    private credentialService: CredentialService,
    private customDatePipe: CustomDatePipe,
    private userService: UserService
  ) {
    const id = this.route.params.subscribe(params => {
      this.userid = params['id'];
      this.credentialid = params['historyid'];
      this.prevId = params['prevId'];
      this.currentid = params['oldid'];
    });
  }

  ngOnInit() {
      this.credentialService
        .getHistoryDetail(this.currentid)
        .map(res => {
          this.currentCredential = res;
          this.getUser(this.currentCredential.lastchange_id);
          this.changedat = this.customDatePipe.transform(
            this.currentCredential.changedat
          );
          this.handlePrev(this.currentCredential);
        })
        .subscribe();
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.userName = user[4];
    },
      err => {
        console.log(err)
      })
  }

  handlePrev(currentCredential) {
    if (this.prevId !== '0') {
      this.credentialService.getHistoryDetail(this.prevId).subscribe(res => {
        this.pastCredential = res;
        this.compareObjects(currentCredential, this.pastCredential);
      });
    } else {
      this.credentialService.getCredential(this.userid).subscribe(res => {
        this.compareObjects(currentCredential, res);
      });
    }
  }

  compareObjects(currentCredential, pastCredential) {
    const diff = {};

    setTimeout(() => {
      if (currentCredential.expireDate !== pastCredential.expireDate) {
        this.errvar += `<p class="margin-text">Data de expiração foi
         alterada de <b>${moment(pastCredential.expireDate).format(
           'DD/MM/YYYY'
         )}
        </b> para <b>${moment(currentCredential.expireDate).format(
          'DD/MM/YYYY'
        )}</b></p>`;
      }

      if (currentCredential.emissionDate !== pastCredential.emissionDate) {
        this.errvar += `<p class="margin-text">Data de emissão foi
         alterada de <b>${moment(pastCredential.emissionDate).format(
           'DD/MM/YYYY'
         )}
        </b> para <b>${moment(currentCredential.emissionDate).format(
          'DD/MM/YYYY'
        )}</b></p>`;
      }

      if (currentCredential.register !== pastCredential.register) {
        this.errvar += `<p class="margin-t">Registro foi alterado
        de <b>${pastCredential[0].register}</b> para <b>${
          currentCredential.register
        }</b></p>`;
      }

      if (
        currentCredential.documentNumber !== pastCredential[0].documentNumber
      ) {
        this.errvar += `<p class="margin-t">O número do documento foi alterado
        de <b>${pastCredential[0].documentNumber}</b> para <b>${
          currentCredential.documentNumber
        }</b></p>`;
      }
    }, 1000);
  }

  cancel() {
    window.history.back();
  }
}
