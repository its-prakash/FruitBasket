import { Component, inject } from '@angular/core';
import { ImportsModule } from '../../../shared/modules/imports/imports.module';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    ImportsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {

  private router = inject(Router);
  private _authService = inject(AuthService)
  private _orderService = inject(OrderService)

  paymentDetails: any;
  addresses: any
  selectedAddressId: string | null = null;
  isLinear = true;
  paymentStatus = 'Pending'
  selectedPaymentMethod: string = 'cod';

  constructor() {

    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      cartData: any;
      productTotal: number;
      discount: number;
      deliveryCharge: number;
      totalPrice: number;
    };

    if (state) {
      this.paymentDetails = state;
      console.log("payment details are ", this.paymentDetails);
    } else {
      this.paymentDetails = null;
      console.warn('No payment data found. Redirecting or showing error...');
    }

  }

  ngOnInit(): void {
    this._authService.getAddress().subscribe({
      next: (res) => {
        this.addresses = res?.addresses
        console.log("addresses are:", this.addresses)
      },
      error: (err) => {
        console.log("Error occur: ", err)
      }
    })
  }

  onAddressSelect(id: string): void {
    this.selectedAddressId = id;
    console.log("Selected target delivery address destination reference node set to:", id);
  }

  orderPlaced(stepper: MatStepper) {
    this._orderService.orderConfirm(this.paymentDetails.totalPrice, this.paymentStatus, this.selectedPaymentMethod).subscribe({
      next: (res) => {
        console.log("order confirmed: ", res)
        stepper.next()
      },
      error: (err) => {
        console.log("order failed: ", err)
      }
    })
  }

  navigateToHome() {
    this.router.navigate(['/home'])
  }
  
  viewOrderDetails() {
    this.router.navigate(['/dashboard'])
  }

}
