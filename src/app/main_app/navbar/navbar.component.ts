import { Component } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'
import { JWTService } from 'src/app/base/services/jwt_auth/jwt.service';

@Component({
	selector: 'nav-bar',
	templateUrl: './navbar.html',
	styleUrls: [
		'./navbar.scss',]
})

export class NavbarComponent {
	constructor(private authService: AuthService, private router: Router, private jwtService: JWTService){}

	onLogout() {
		this.authService.logout()
		.subscribe(res => {
			this.jwtService.removeToken();
			this.router.navigate(['/login'])
		})
	}
}