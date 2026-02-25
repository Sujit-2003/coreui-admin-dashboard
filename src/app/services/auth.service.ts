import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(this.getUserDetails());
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {}

  getUserDetails(): any {
    const data = localStorage.getItem('User_Details');
    return data ? JSON.parse(data) : null;
  }

  setUserDetails(data: any): void {
    localStorage.setItem('User_Details', JSON.stringify(data));
    this.userSubject.next(data);
  }

  isLoggedIn(): boolean {
    return !!this.getUserDetails();
  }

  logout(): void {
    localStorage.removeItem('User_Details');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
