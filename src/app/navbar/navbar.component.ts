import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private loginService: LoginService,
                private router: Router) {
    }

    ngOnInit() {
    }

    public goToMovie() {
        this.router.navigateByUrl('/movie');
    }

    public logOut() {
        this.loginService.logout();
    }

}
