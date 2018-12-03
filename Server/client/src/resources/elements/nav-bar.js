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
        console.log(this.email);
        console.log(this.password);
        this.authenticated = true;
        this.router.navigate('home');
    }
    logout() {
        this.authenticated = false;
        this.router.navigate('landing');
    }
}
