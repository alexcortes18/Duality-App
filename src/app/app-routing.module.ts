import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ListaRestaurantesComponent } from './user/lista-restaurantes/lista-restaurantes.component';
import { CurrentReservationComponent } from './user/current-reservation/current-reservation.component';

const routes: Routes = [
    { path:'', component: WelcomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component:LoginComponent},
    { path: 'lista-restaurantes', component:ListaRestaurantesComponent},
    { path: 'current-reservation', component:CurrentReservationComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}