import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.InitForm()
  }
  InitForm() {
    this.loginForm = new FormGroup({
      'Email': new FormControl('', [Validators.required]),
      'Password': new FormControl('', [Validators.required]),
    })
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    debugger;
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    else {
      var data = this.loginForm.value
      this.userService.login(data).subscribe((result: any) => {
        if (result) {
          if (!result?.error) {
            alert(result.message)
            this.router.navigate(['/users'])
          }
          else
            alert(result?.error)
        }
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
