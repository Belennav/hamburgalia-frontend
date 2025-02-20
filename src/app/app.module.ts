import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HamburguesaFormComponent } from './hamburguesa-form/hamburguesa-form.component';
import { HamburguesaComponent } from './hamburguesa/hamburguesa.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HamburguesaFormComponent,
    HamburguesaComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
