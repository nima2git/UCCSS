import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)

export class Landing {
    constructor(router){
        this.router = router;
        this.foo = "";
        this.woo = "";
        this.authenticated = true;
    }

}