import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SlicePipe,
    CurrencyPipe,
    DatePipe
  ],
  exports :[
    SlicePipe,
    CurrencyPipe,
    DatePipe
  ]
})
export class PipesModule { }
