import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import {UserDto} from "../models/UserDto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8082/users';

  constructor(private http: HttpClient) {}

  register(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${this.baseUrl}/signup`, user);
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signin`, { email, password });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
