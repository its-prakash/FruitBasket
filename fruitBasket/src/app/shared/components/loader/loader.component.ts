import { Component } from '@angular/core';
import { ImportsModule } from '../../modules/imports/imports.module';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    ImportsModule
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {

}
