import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.InitForm()
  }
  InitForm() {
    this.registerForm = new FormGroup({
      'FirstName': new FormControl('', [Validators.required]),
      'LastName': new FormControl('', [Validators.required]),
      'Email': new FormControl('', [Validators.required]),
      'Mobile': new FormControl('', [Validators.required]),
      'Password': new FormControl('', [Validators.required]),
      'Role': new FormControl('Guest', [Validators.required]),
    })
  }

  get f() {
    return this.registerForm.controls;
  }
  changeRole(e: any) {
    this.registerForm.get('Role')?.setValue(e.target.value)
  }

  onSubmit() {
    debugger;
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    else {
      var data = this.registerForm.value
      this.userService.createUser(data).subscribe((result: any) => {
        alert(result)
        this.router.navigate(['/'])
      })
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
