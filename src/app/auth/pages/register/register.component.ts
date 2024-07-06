import { User } from './../../../models/User';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  hide = true;
  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {

    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  onSubmit() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      this.authService.register(user).subscribe(
        (response) => {
          this.authService.login(user).subscribe(
            (loginResponse) => {
              this.router.navigate(['/'])
            },
            (loginError) => {
              console.error("Login failed after registration:", loginError);
            }
          );
        },
        (error) => {
          console.error("Registration failed:", error);
        }
      );
    }
  }

}
