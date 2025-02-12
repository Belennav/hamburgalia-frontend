import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { HamburguesaFormComponent } from './hamburguesa-form/hamburguesa-form.component';
import { HamburguesaComponent } from './hamburguesa/hamburguesa.component';


const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    InicioComponent,
    HamburguesaFormComponent,
    HamburguesaComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





