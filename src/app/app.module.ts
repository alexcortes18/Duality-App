import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { LonginComponent } from './auth/longin/longin.component';
import { WelcomeComponent } from './welcome/welcome.component'
import { AppRoutingModule } from './app-routing.module';
import { MatDatepickerModule, MatNativeDateModule, MatCheckbox, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LonginComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
