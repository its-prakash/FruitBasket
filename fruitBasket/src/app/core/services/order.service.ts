import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)

  // baseUrl = "http://localhost:3000/api/order"
  baseUrl = "https://fruitbasket-n8by.onrender.com/api/order"

  orderConfirm(totalAmount: number, paymentStatus: string , paymentMethod : string): Observable<any> {

    if (paymentStatus === "Failed") {
      console.warn("Processing an order with a Failed payment status.");
    }

    const payload = { totalAmount, paymentStatus, paymentMethod };
    return this.http.post<any>(`${this.baseUrl}/orderConfirm`, payload);

  }

  getOrder() : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/getOrders`)
  }

}
