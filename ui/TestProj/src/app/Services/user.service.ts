import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: any = environment.apiUrl
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get(this.apiUrl + 'UserList/GetUsers');
  }
  createUser(data: any) {
    var formData = new FormData()
    for (let obj in data)
      formData.append(obj, data[obj])

    return this.http.post(this.apiUrl + 'UserList/AddUser', formData);
  }
  deleteUser(id: any) {
    return this.http.delete(this.apiUrl + 'UserList/DeleteUser?_id=' + id);
  }

  login(data: any) {
    var formData = new FormData()
    for (let obj in data)
      formData.append(obj, data[obj])

    return this.http.post(this.apiUrl + 'UserList/Login', formData);

  }
}
