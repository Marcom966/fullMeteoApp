import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CronoComponent } from './components/crono/crono.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponentComponent } from './components/login-component/login-component.component';
import { LogoutComponentComponent } from './components/logout-component/logout-component.component';

const routes: Routes = [{
  path: 'home', component: HeaderComponent
},{
  path: 'login', component: LoginComponentComponent
},{
  path: 'crono', component: CronoComponent
},
{
  path: 'lougout', component: LogoutComponentComponent
},
{
  path: '**', redirectTo: 'login' 
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
