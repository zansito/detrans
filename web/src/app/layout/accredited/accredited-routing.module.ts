import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccreditedComponent } from './accredited.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from '../../login/login.component';
import { LayoutComponent } from '../layout.component';
import { LayoutModule } from '../layout.module';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';
import { AccreditedHistory } from './domain/accredited-history.model';

const routes: Routes = [
  { path: '', component: LayoutModule },
  { path: 'lista', component: AccreditedComponent },
  { path: 'novo', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
  { path: 'history/:id', component: HistoryComponent },
  { path: 'history/detail/:id/:historyid/:prevId',
    component: HistoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccreditedRoutingModule {
}
