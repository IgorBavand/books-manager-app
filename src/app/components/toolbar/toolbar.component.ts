import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  isLogged: boolean = false;

  ngOnInit(): void {
    this.authService.isLogged().subscribe((isLogged) => {
      this.isLogged = isLogged;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth', 'sigin']);
  }
}
