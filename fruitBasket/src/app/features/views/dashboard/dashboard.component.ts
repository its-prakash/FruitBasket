import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, computed, TemplateRef } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportsModule } from '../../../shared/modules/imports/imports.module';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ImportsModule,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private router = inject(Router)
  private _authService = inject(AuthService)
  private _orderService = inject(OrderService)
  private dialog = inject(MatDialog)
  private fb = inject(FormBuilder)

  userData: any
  userId: any
  orders: any
  userAddress: any

  isMobileMenuClosed = true;
  toggleMobileMenu(): void {
    this.isMobileMenuClosed = !this.isMobileMenuClosed;
  }

  activeTab: 'account' | 'orders' | 'liked' | 'addresses' | 'payments' | 'delete-account' = 'account';
  switchTab(tabName: 'account' | 'orders' | 'liked' | 'addresses' | 'payments' | 'delete-account'): void {
    this.activeTab = tabName;
    this.isMobileMenuClosed = true;
  }

  addressTypes = ['Home', 'Work', 'Other'];
  addressForm = this.fb.group({
    addressType: ['', [Validators.required]],
    area: ['', [Validators.required, Validators.minLength(3)]],
    landmark: [''],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  })

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')
    console.log("user userid is: ", this.userId)
    if (this.userId) this.getCurrentUserDetails(this.userId);
    this.getOrdersHistory()
    this.getUserAddress()
  }

  getCurrentUserDetails(userId: string) {
    this._authService.getCurrentUser(userId).subscribe({
      next: (res: any) => {
        console.log("current user account details are", this.userData)
        this.userData = res?.user
      },
      error: (err) => { }
    })
  }

  onLogout(): void {
    if (confirm('Are you sure you want to end your current session?')) {
      this._authService.logoutUser().subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('logout is not possible', err)
        }
      })

    }
  }

  onDeleteAccount(): void {
    const confirmation = confirm('CRITICAL WARNING: This action permanently deletes your account data. Do you wish to proceed?');
    if (confirmation) {
      console.warn('Account deletion sequence initiated.');
      this._authService.deleteUserAccount(this.userId).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Account deletion failed", err)
        }
      })
    }
  }

  getOrdersHistory() {
    this._orderService.getOrder().subscribe({
      next: (res: any) => {
        this.orders = res?.orders
        console.log("orders are: ", this.orders)
      }
    })
  }

  countOrdersByStatus(status: string): number {
    if (!this.orders) return 0;
    return this.orders.filter((order: any) => order.paymentStatus === status).length;
  }

  openDialog(template: TemplateRef<any>) {
    this.dialog.open(template, {
      width: '1000px',
      height: '200px'
    });
  }

  closeModal() {
    this.dialog.closeAll()
  }

  onSubmit() {
    const rawData = this.addressForm.getRawValue()
    console.log(rawData)
    this._authService.addAddress(rawData).subscribe({
      next: (res) => {
        this.getUserAddress()
        console.log(res)
      }
    })
    this.closeModal()
  }

  getUserAddress() {
    this._authService.getAddress().subscribe({
      next: (res) => {
        this.userAddress = res?.addresses
        console.log("user addresses are : ", this.userAddress)
      },
      error: (err) => {
        console.error("Not getting user address :", err)
      }
    })
  }

  deleteUserAddress(addressId: string) {
    this._authService.deleteAddress(addressId).subscribe({
      next: (res) => {
        this.getUserAddress()
        console.log("Delete address successfully", res)
      },
      error: (err) => {
        console.log("Cannot deleted this address", err)
      }
    })
  }



}



