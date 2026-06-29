import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public http = inject(HttpClient)

  baseUrl = "http://localhost:3000/api/products"

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`);
  }

}
