import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from 'app/shared/styleguide/modal/modal.module';

import { PromptComponent } from './prompt.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    FormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [PromptComponent],
  exports: [PromptComponent],
  entryComponents: [PromptComponent],
})
export class PromptModule { }
