import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {FormComponent} from './form/form.component';


const routes: Routes = [
    {path: '', component: UsersComponent},
    {path: 'novo', component: FormComponent},
    { path: 'edit/:id', component: FormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UsersRoutingModule {
}
