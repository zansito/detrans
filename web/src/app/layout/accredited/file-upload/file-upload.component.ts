import { Component, EventEmitter, OnInit, Input, OnChanges } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, UploadOutput } from 'ngx-uploader';
import { LoginService } from '../../../login/domain/login.service';

import * as moment from 'moment';
import { AccreditedUploadFileService } from '../services/accredited.upload-file.service';
import { Accredited } from '../domain/accredited.model';
import { LoginModel } from '../../../login/domain/login.model';
import { UzerService } from '../../../shared/services/user.service';
import { User } from '../../users/domain/user.model';
import { Document } from '../domain/document.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'file-upload',
  templateUrl: 'file.upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  animations: [routerTransition()]
})
export class FileUploadComponent implements OnInit, OnChanges {
  private headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + this.loginService.getToken()
  });

  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  today: number = Date.now();
  @Input() accredited: Accredited;
  user: User;
  documents: Document[] = [];
  linkUrl = 'http://localhost:8080/files/';
  modal = true;
  closeResult: string;

  constructor(
    private loginService: LoginService,
    private userService: UzerService,
    private accreditedFileUploadServce: AccreditedUploadFileService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {
    this.options = { concurrency: 1 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
  }

  ngOnInit() {
    moment.locale('pt-br');
    this.user = this.loginService.getCurrentUser();
    this.userService
      .getUserData(this.user.username)
      .subscribe(res => (this.user = res));

    this.accreditedFileUploadServce
      .getDocumentInfo(this.accredited.id)
      .subscribe(res => {
        this.documents = res;

        this.documents.map(document => {
          document.uploadDate = this.formatDate(document.uploadDate);
          if (document.fileName.endsWith('pdf')) {
            document.isPng = 'assets/images/pdf.png';
          }
        });

        // incluir validação para se o arquivo tiver "."
      });
  }

  formatDate(uploadDate) {
    return moment(uploadDate).format('DD/MM/YYYY');
  }

  ngOnChanges() {}

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: 'http://localhost:8080/upload-file',
        headers: { Authorization: 'Bearer ' + this.loginService.getToken() },
        method: 'POST',
        data: { foo: 'bar' }
      };

      this.uploadInput.emit(event);
    } else if (
      output.type === 'addedToQueue' &&
      typeof output.file !== 'undefined'
    ) {
      this.files.push(output.file);
    } else if (
      output.type === 'uploading' &&
      typeof output.file !== 'undefined'
    ) {
      const index = this.files.findIndex(
        file => typeof output.file !== 'undefined' && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'done') {
      const fileData = {
        accreditedId: this.accredited.id,
        fileName: output.file.name,
        uploadDate: moment(this.today).format('YYYY-MM-DD'),
        createdBy: this.user.id,
        createdByName: null
      };

      this.toastr.success('Arquivo cadastrado com sucesso!', 'Sucesso!', {
        timeOut: 3000
      });
      this.saveDocumentData(fileData);
      this.reload();
    } else if (
      output.type === 'rejected' &&
      typeof output.file !== 'undefined'
    ) {
      console.log(output.file.name + ' rejected');
    }

    this.files = this.files.filter(file => file.progress.status);
  }

  reload() {
    this.accreditedFileUploadServce
      .getDocumentInfo(this.accredited.id)
      .subscribe(res => {
        this.documents = res;
        this.ngOnInit();
      });
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:8080/upload-file',
      headers: { Authorization: 'Bearer ' + this.loginService.getToken() },
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadInput.emit(event);
  }

  saveDocumentData(data) {
    return this.accreditedFileUploadServce.saveInfo(data).subscribe(res => {
      this.reload();
    });
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }

  download(documenturl) {
    window.open(this.linkUrl + documenturl);
  }

  delete(ctnt) {
    this.accreditedFileUploadServce.deleteFile(ctnt.id).subscribe(res => {
      if (res === 200) {
        this.deleteFileFromRepository(ctnt.fileName);
      }
    });
  }

  deleteFileFromRepository(fileName) {
    this.accreditedFileUploadServce
      .deleteFileFromRepository(fileName)
      .subscribe(
        res => {
          this.reload();
          this.toastr.success('Arquivo deletado com sucesso!', 'Sucesso!', {
            timeOut: 3000
          });
        },
        err => {
          this.toastr.error('Erro ao deletar o arquivo!', 'Erro!', {
            timeOut: 3000
          });
        }
      );
  }

  open(content, document) {
    const finalContent = Object.assign(content, document);
    this.modalService.open(finalContent, {
      windowClass: 'dark-modal',
      size: 'lg'
    });
  }

  deleteModal(ctnt, document) {
    const finalContent = Object.assign(ctnt, document);
    this.modalService.open(finalContent, {
      windowClass: 'img-resizer',
      size: 'sm'
    });
  }
}
