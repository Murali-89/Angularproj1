import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class UserService {
  userURL: string = 'http://localhost:8080/api/v1/user';
  constructor(private http: HttpClient) { }
  registerUser(data) {
    return this.http.post(`${this.userURL}`, data);
  }

}
