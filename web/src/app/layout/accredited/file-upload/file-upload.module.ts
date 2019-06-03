import { NgModule } from '@angular/core';

import { FileUploadComponent } from './file-upload.component';
import { AccreditedUploadFileService } from '../services/accredited.upload-file.service';
import { UzerService } from '../../../shared/services/user.service';

@NgModule({
  imports: [],
  exports: [FileUploadComponent],
  declarations: [FileUploadComponent],
  providers: [AccreditedUploadFileService],
})
export class FileUploadModule { }
