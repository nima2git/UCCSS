// export class User {
// 	constructor(){
// 		this.message = "User";
// 	}
// }


//THE CODE BLOCK BELOW REPLACE THE ONE ABOVE, FROM WEEK 10 AURELIA ROUTING BASICS SLIDE 11
//ADDS A LOG OUT BUTTON
//CODE IS UPDATED WITH WEEK 10 AURELIA DATA LAYER SLIDE 15

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object'
@inject(Router, User)
export class Users {
constructor(router, users) {
  this.router = router;
    this.users = users;
    this.message = 'Users';
    this.showUserEditForm = false;
    }
  
newUser() {
  this.user = {
    firstName: "",
      lastName: "",
      active: true,
      role: "user",
      email: "",
      password: ""
      }
    	this.showUserEditForm = true;
    
  }




