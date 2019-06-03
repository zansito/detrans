import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Credential } from '../domain/credential.model';
import { Accredited } from '../../accredited/domain/accredited.model';
import { CredentialService } from '../service/credential.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccreditedService } from '../../accredited/services/accredited.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../../login/domain/login.service';
import { UserService } from '../../users/domain/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "view-component",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.scss"],
  providers: [DatePipe],
  animations: [routerTransition()]
})
export class ViewComponent implements OnInit {
  private loaded;
  private credential = Credential;
  private accredited = Accredited;
  accreditedId: number;
  hasCredential = false;
  pdfSrc = "http://localhost:8080/credential/download/";
  resultArray: any;
  zoomVar = 0;
  emissionDate: string;
  expireDate: string;
  modal = true;

  headers = new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.loginService.getToken()
  });

  constructor(
    private credentialService: CredentialService,
    private route: ActivatedRoute,
    private accreditedService: AccreditedService,
    private toastr: ToastrService,
    private router: Router,
    private userService: UserService,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.zoomVar = 0.5;
    const id = this.route.params.subscribe(params => {
      const id = params["id"];

      if (!id) {
        return;
      }

      this.getAccredited(id);
      this.getCredential(id);
    });
  }

  loadMyChildComponent() {
    this.loaded = true;
  }

  create() {
    this.router.navigate(["layout/credencial/form/", this.accreditedId]);
  }

  edit() {
    this.router.navigate(["layout/credencial/edit/", this.accreditedId]);
  }
  getAccredited(id) {
    this.accreditedService.getAccredited(id).subscribe(
      accredited => {
        this.accreditedId = accredited.id;
        this.accredited = accredited;
      },
      err => {
        this.toastr.error("Erro!", "Alguma coisa deu errado!", {
          timeOut: 3000
        });
      }
    );
  }

  getCredential(id) {
    this.credentialService.getCredential(id).subscribe(
      credential => {
        this.credential = credential[0];
        if (credential.length > 0) {
          this.hasCredential = true;
          this.resultArray = credential.map(function(a) {
            return a['fileName'];
          });
          this.formatDates(credential);

          this.pdfSrc = `${this.pdfSrc}${this.resultArray.toString()}`;
        }
      },
      err => {
        this.toastr.error('Erro!', 'Alguma coisa deu errado!', {
          timeOut: 3000
        });
      }
    );
  }

  formatDates(credential) {
    this.emissionDate = this.datePipe.transform(
      credential[0].emissionDate,
      'dd/MM/yyyy'
    );
    this.expireDate = this.datePipe.transform(
      credential[0].expireDate,
      'dd/MM/yyyy'
    );
  }

  download() {
    this.credentialService.download(this.accreditedId).subscribe(
      res => {
        (<any>window).open(res.url);
      },
      err => {
        this.toastr.error(
          'Erro!',
          'Houve um problema ao tentar fazer o download da credencial!',
          { timeOut: 3000 }
        );
      }
    );
  }

  print() {
    this.credentialService.print(this.accreditedId).subscribe(
      res => {
        const blob = new Blob([res.blob()], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
      },
      err => {
        this.toastr.error(
          'Erro!',
          'Houve um problema ao tentar fazer ao tentar imprimir  a credencial!',
          { timeOut: 3000 }
        );
      }
    );
  }

  del(document, ctnt) {
    const finalContent = Object.assign(ctnt, document);
    this.modalService.open(finalContent, {
      windowClass: 'img-resizer',
      size: 'sm'
    });
  }


  delete() {
    this.credentialService.delete(this.accreditedId).subscribe(
      res => {
        this.toastr.success('Credencial deletada com sucesso!', 'Sucesso!', {
          timeOut: 3000
        });
        this.router.navigate(['layout/accredited/lista']);
        this.modal = false;
      },
      err => {
        this.modal = false;
        this.toastr.error(
          'Houve um problema ao deletar a credencial!',
          'Erro!',
          { timeOut: 3000 }
        );
      }
    );
  }

  zoomIn() {
    this.zoomVar = 0.8;
  }

  zoomOut() {
    this.zoomVar = 0.5;
  }

  back() {
    this.router.navigate(['layout/accredited/lista']);
  }
}
