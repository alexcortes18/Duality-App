import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LonginComponent } from './auth/longin/longin.component';

const routes: Routes = [
    { path:'', component: WelcomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component:LonginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}