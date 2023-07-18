import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {CountriesRoutingModule} from "./countries-routing.module";
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
// import {CountriesService} from "./services/countries.service";



@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    /* service */
  ]
})
export class CountriesModule { }
