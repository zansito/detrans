import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
import { CanActivateAuthGuard } from './shared/services/authentication.guard';
import { ResetComponent } from './login/forgot/reset/reset.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './login/login.module#LoginModule',
        pathMatch: 'full'
    },
    { path: 'layout', loadChildren: './layout/layout.module#LayoutModule', canActivate: [CanActivateAuthGuard] },
    { path: 'forgot', loadChildren: './login/forgot/forgot.module#ForgotModule', pathMatch: 'full'},
    { path: 'reset', component: ResetComponent },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
