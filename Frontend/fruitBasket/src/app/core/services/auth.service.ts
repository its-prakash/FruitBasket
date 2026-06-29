import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface registerDetails {
  userName: string;
  fullName: string;
  email: string;
  mobileNo: string;
  password?: string;
}

export interface loginDetails {
  userName?: string;
  email?: string;
  mobileNo?: string;
  password?: string;
}

export interface backendResponse {
  message: string
  user?: UserProfile
}

export interface UserProfile {
  _id: string;
  userName: string;
  fullName: string;
  email: string;
  mobileNo: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public http = inject(HttpClient)

  isLoggedIn = new BehaviorSubject<boolean>(false);

  baseUrl = "http://localhost:3000/api/users"

  constructor() {
    this.isAuthenticated()
  }

  registerUser(rawData: registerDetails): Observable<backendResponse> {
    return this.http.post<backendResponse>(`${this.baseUrl}/register`, rawData)
  }

  loginUser(credentials: loginDetails): Observable<backendResponse> {
    return this.http.post<backendResponse>(`${this.baseUrl}/login`, credentials, {
      withCredentials: true
    }).pipe(
      tap(res => {

        if (res && res.user && res.user._id) {
          localStorage.setItem("authToken", res.user._id);
          this.isLoggedIn.next(true);
        }
      })
    )
  }

  private isAuthenticated() {

    try {
      const userId = localStorage.getItem('authToken')

      if (userId) {
        this.isLoggedIn.next(true)
      }

    } catch (err) {
      console.log("login again", err)
    }

  }


  getCurrentUser(userId: string) {
    return this.http.post(`${this.baseUrl}/getCurrentUser`, { id: userId })
  }

  logoutUser() {
    localStorage.removeItem('authToken');
    return this.http.post(`${this.baseUrl}/logout`, {})
  }

  deleteUserAccount(id: string) {
    localStorage.removeItem('authToken');
    return this.http.delete<any>(`${this.baseUrl}/deleteAccount/${id}`)
  }

  addAddress(rawData: any) {
    return this.http.post(`${this.baseUrl}/addAddress`, rawData)
  }

  getAddress(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getUserAddress`)
  }

  deleteAddress(addressId : string): Observable<any>{
    return this.http.delete(`${this.baseUrl}/removeAddress/${addressId}`);
  }

  contactMessage(rawData : any) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/getContactMessage`,rawData)
  }


}
