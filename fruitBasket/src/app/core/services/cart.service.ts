import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private http = inject(HttpClient)

  baseUrl = "http://localhost:3000/api/cart"
  // baseUrl = "https://fruitbasket-n8by.onrender.com/api/cart"

  addToCart(productId: string, quantity: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-cart`, { productId, quantity });
  }

  getCart(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getCart`, {
      withCredentials: true
    });
  }

  updateQuantity(productId: string, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/updateQuantity`, { productId, quantity });
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/removeFromCart/${productId}`);
  }

}
