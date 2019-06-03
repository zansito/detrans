import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CanActivateAuthGuard } from '../shared/services/authentication.guard';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [CanActivateAuthGuard] },
      { path: 'users', loadChildren: './users/users.module#UsersModule', canActivate: [CanActivateAuthGuard] },
      // { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'accredited', loadChildren: './accredited/accredited.module#AccreditedModule', canActivate: [CanActivateAuthGuard] },
      { path: 'credencial', loadChildren: './credential/credential.module#CredentialModule', canActivate: [CanActivateAuthGuard] },
      { path: 'portal', loadChildren: './portal/portal.component.module#PortalModule', canActivate: [CanActivateAuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
