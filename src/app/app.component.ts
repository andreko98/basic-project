//Desenvolvido por André Koschnik
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, public authGuard: AuthGuard) { 
  }
  
  ngOnInit(): void {

  }

  toggleMenu() {
    document.getElementById('menu').classList.toggle("menu-closed");
    document.getElementById('toggle').classList.toggle("btn-closed");
  }

  closeMenu() {
    document.getElementById('menu').classList.add("menu-closed");
    document.getElementById('toggle').classList.add("btn-closed");
  }

  navigate(route) {
    switch(route) {
      case("login"):
        this.router.navigate(['/login']);
      break;

      case("vehicles"):
        this.router.navigate(['/']);
      break;

      case("logout"):
        localStorage.clear();
        this.toggleMenu();
        this.router.navigate(['/login']);
      break;
    }

    this.closeMenu();
  }
}
