import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public UsersList: any[] = []
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.GetAllUsers()
  }

  GetAllUsers() {
    this.userService.getAllUsers().subscribe((result: any) => {
      if (result) {
        this.UsersList = result;
      }
      else {
        console.log("something went wrong")
      }
    }, (Error: any) => { console.error(Error) })
  }

  deleteUser(user: any) {
    debugger;
    this.userService.deleteUser(user._id).subscribe((result: any) => {
      if (result)
        this.GetAllUsers()
    })
  }

}
