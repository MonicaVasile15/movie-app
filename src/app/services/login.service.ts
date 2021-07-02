import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../model/login-response.model';

@Injectable()

export class LoginService {
    private localStorage: Storage;

    constructor(private httpClient: HttpClient,
                private router: Router) {
        this.localStorage = window.localStorage;
    }

    public login() {
        return this.httpClient.get<LoginResponseModel[]>('assets/data/credentials.json');
    }

    public logout() {
        this.router.navigateByUrl('login');
        this.localStorage.removeItem('token');
    }

}
