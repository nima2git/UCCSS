import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {AuthService} from 'aurelia-auth';


@inject(Router, AuthService)
export class NavBar {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.loginError = '';    
        this.authenticated = false;
        this.email = "";
        this.password = "";
    }
    //The attached code block makes it so the links that are clicked are highlighted 'home', 'users',
    //'helpTickets'.
    attached() {
        $('.navbar-nav a').on('click', function () {
            $('.navbar-nav').find('li.active').removeClass('active');
            $(this).parent('li').addClass('active');
        });
    }

    login() {
        return this.auth.login(this.email, this.password)
        .then(response => {
        this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(this.userObj));
        this.loginError = "";
        this.isAuthenticated = this.auth.isAuthenticated();
        this.router.navigate('home');
        })
        .catch(error => {
        console.log(error);
        this.authenticated = false;
        this.loginError = "Invalid credentials.";
        });
        };
        
    logout() {
        this.authenticated = false;
        this.router.navigate('landing');
    }
}
