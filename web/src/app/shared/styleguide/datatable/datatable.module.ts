import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ModalModule } from './../modal/modal.module';
import { ComponentResolverModule } from './../component-resolver/component-resolver.module';
import { PromptComponent } from 'app/shared/styleguide/prompt/prompt.component';

import { DatatableComponent } from './datatable/datatable.component';
import { DatatableRowButtonComponent } from './datatable-row-button/datatable-row-button.component';
import { DatatableButtonComponent } from './datatable-button/datatable-button.component';
import { DatatablePaginationComponent } from './datatable-pagination/datatable-pagination.component';
import { DatatableSearchComponent } from './datatable-search/datatable-search.component';
import { DatatableFiltersComponent } from './datatable-filters/datatable-filters.component';
import { DatatableHttpService } from './datatable-http.service';
import { PromptModule } from 'app/shared/styleguide/prompt/prompt.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    FormsModule,
    ComponentResolverModule,
    ModalModule,
    PromptModule,
    NgbDropdownModule.forRoot()
  ],
  declarations: [
    DatatableComponent,
    DatatableButtonComponent,
    DatatableRowButtonComponent,
    DatatablePaginationComponent,
    DatatableSearchComponent,
    DatatableFiltersComponent,
  ],
  exports: [
    DatatableComponent,
  ],
  providers: [
    DatatableHttpService
  ],
  entryComponents: [PromptComponent]
})
export class DatatableModule { }
