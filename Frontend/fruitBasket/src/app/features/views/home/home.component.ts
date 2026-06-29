import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PipesModule } from '../../../shared/modules/pipes/pipes.module';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PipesModule,
    RouterLink,
    ShopComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _productService = inject(ProductService)

  products: any[] = []

  ngOnInit(): void {
    this._productService.getProducts().subscribe({
      next: (res) => {
        console.log(res.products)
        this.products = res.products
      },
      error: (err) => {
        console.error("product data fetch failed")
      }
    })
  }

}
