import { Component, inject } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { PipesModule } from '../../../shared/modules/pipes/pipes.module';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    PipesModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  products: any[] = [];
  cartQuantities: { [productId: string]: number } = {};

  private _productService = inject(ProductService);
  private _cartService = inject(CartService);

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts() {
    this._productService.getProducts().subscribe({
      next: (res) => {
        this.products = res.products || [];
        console.log('Products loaded:', this.products);
      },
      error: (err) => {
        console.error('Product data fetch failed', err);
      }
    });
  }

  loadCart() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        console.log('Cart response:', res);

        this.cartQuantities = {};

        const cartItems = res.cartItems || [];

        cartItems.forEach((item: any) => {
          const productId = item.productId?._id || item.productId;

          if (productId) {
            this.cartQuantities[productId] = item.quantity;
          }
        });

        console.log('Cart quantities:', this.cartQuantities);
      },
      error: (err) => {
        console.error('Cart fetch failed', err);
      }
    });
  }

  addToCart(productId: string) {
    this._cartService.addToCart(productId, 1).subscribe({
      next: (res) => {
        console.log('Product added to cart', res);
        this.loadCart();
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      }
    });
  }

  changeQuantity(productId: string, currentQuantity: number, action: 'plus' | 'minus') {
    let newQuantity = currentQuantity;

    if (action === 'plus') {
      newQuantity = currentQuantity + 1;
    } else {
      if (currentQuantity <= 1) {
        return;
      }
      newQuantity = currentQuantity - 1;
    }

    this._cartService.updateQuantity(productId, newQuantity).subscribe({
      next: (res) => {
        console.log('Quantity updated', res);
        this.loadCart();
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }

}