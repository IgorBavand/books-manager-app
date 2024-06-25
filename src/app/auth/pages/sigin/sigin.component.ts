import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss'],
})
export class SiginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  hide = true;

  authLogin!: Login;
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  login() {
    this.authLogin = Object.assign('', this.authLogin, this.loginForm.value);
    this.authLogin.username = this.authLogin.username.toLowerCase();

    this.authService
      .login({
        username: this.authLogin.username,
        password: this.authLogin.password,
      })
      .subscribe(
        (user) => {
          if (user) {
            this.router.navigateByUrl('/books');
          }
        },
        (error) => {
          this._snackBar.open('ocorreu um erro');
        }
      );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'sigin']);
  }
}
