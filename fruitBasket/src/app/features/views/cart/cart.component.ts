import { Component, inject } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { PipesModule } from '../../../shared/modules/pipes/pipes.module';
import { OrderService } from '../../../core/services/order.service';
import { Router } from '@angular/router';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    PipesModule,
    A11yModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  private _cartService = inject(CartService)
  private _orderService = inject(OrderService)
  private router = inject(Router)

  cartData: any

  ngOnInit(): void {
    this.getCartData()
  }

  getCartData() {
    this._cartService.getCart().subscribe({
      next: (res) => {
        this.cartData = res?.cartItems
        console.log(this.cartData)
      },
      error: (err) => {
        console.log("failed to fetch cart Data ", err)
      }
    })
  }

  removeFromCart(id: string) {
    this._cartService.removeFromCart(id).subscribe({
      next: (res) => {
        console.log("Remove from cart Successfully ", res)
        this.getCartData()
      },
      error: (err) => {
        console.log("Failed to remove from cart ", err)
      }
    })
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
        this.getCartData();
      },
      error: (err) => {
        console.error('Error updating quantity:', err);
      }
    });
  }

  get bagTotal(): number {
    return this.cartData.reduce((sum: any, item: any) => {
      const originalPrice = item.productId.price;
      return sum + (originalPrice * item.quantity);
    }, 0);
  }

  get discount(): number {
    return this.bagTotal * 0.10
  }

  get total(): number {
    return this.bagTotal - this.discount
  }

  get deliveryCharge(): number {
    return 50
  }

  // onCheckout(totalPrice: number, payment: string) {

  // this._orderService.orderConfirm(totalPrice, payment).subscribe({
  //   next: (res) => {
  //     console.log("order confirmed: ", res)
  //     this.router.navigate(['/home'])
  //     this.getCartData()
  //   },
  //   error: (err) => {
  //     console.log("order failed: ", err)
  //   }
  // })

  // }

  onSubmit() {
    this.router.navigate(['/payment'],
      {
        state: {
          cartData: this.cartData,
          productTotal: this.bagTotal,
          discount: this.discount,
          deliveryCharge: this.deliveryCharge,
          totalPrice: this.total,
        }
      })
  }


}
