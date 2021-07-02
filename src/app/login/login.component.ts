import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginResponseModel } from '../model/login-response.model';
import { Router } from '@angular/router';
import * as uuid from 'uuid';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public showError = false;
    private localStorage: Storage;
    private response: LoginResponseModel[];

    constructor(private formBuilder: FormBuilder,
                private loginService: LoginService,
                private router: Router) {
        this.localStorage = window.localStorage;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            'username': ['', [Validators.required]],
            'password': ['', [Validators.required]]
        });

    }

    login() {
        const username = this.loginForm.get('username').value;
        const password = this.loginForm.get('password').value;
        this.loginService.login().subscribe(response => {
            this.response = response;
            if ( this.response.some(el => el.username === username && el.password === password) ) {
                this.localStorage.setItem('token', uuid.v4());
                this.router.navigateByUrl('movie');
            } else {
                this.showError = true;
            }
        });
    }
}
