// export class User {
// 	constructor(){
// 		this.message = "User";
// 	}
// }


//THE CODE BLOCK BELOW REPLACE THE ONE ABOVE, FROM WEEK 10 AURELIA ROUTING BASICS SLIDE 11
//ADDS A LOG OUT BUTTON

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Users {
  constructor(router) {
	this.router = router;
          this.message = 'Users';
  }

  logout(){
	  this.router.navigate('home');
  }
}
