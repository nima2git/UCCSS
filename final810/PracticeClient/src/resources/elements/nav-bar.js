import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { AuthService } from 'aurelia-auth';


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

    //this code block makes it so that when user refreshes the session is still authenticated and user is not kicked out
    bind() {
        this.isAuthenticated = this.auth.isAuthenticated();
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
                this.fooObj = response.foo;
                sessionStorage.setItem("fooObj", JSON.stringify(this.fooObj));
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
        if (this.fooObj) this.auth.logout(this.foo.Obj);
        sessionStorage.removeItem('user');
        this.isAuthenticated = this.auth.isAuthenticated();
        this.auth.logout();
    }

}
