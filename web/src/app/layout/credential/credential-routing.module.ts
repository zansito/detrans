import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CredentialComponent} from './credential.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';
import { HistoryComponent } from './history/history.component';
import { HistoryDetailComponent } from './history/history-detail/history-detail.component';

const routes: Routes = [
  { path: 'view/:id', component: ViewComponent },
  { path: 'form/:id', component: FormComponent },
  { path: 'edit/:id', component: FormComponent },
  { path: 'history/:id', component: HistoryComponent },
  {
    path: 'history/detail/:id/:prevId/:historyid/:oldid',
    component: HistoryDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CredentialRoutingModule {
}
