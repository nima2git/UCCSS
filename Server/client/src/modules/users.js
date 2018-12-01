// export class User {
// 	constructor(){
// 		this.message = "User";
// 	}
// }


//THE CODE BLOCK BELOW REPLACES THE ONE ABOVE, FROM WEEK 10 AURELIA ROUTING BASICS SLIDE 11
//ADDS A LOG OUT BUTTON
//CODE IS UPDATED WITH WEEK 10 AURELIA DATA LAYER SLIDE 15

import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { User } from '../resources/data/user-object';

@inject(Router, User)

export class Users {
  constructor(router, users){
    this.router = router;
    this.users = users;
    this.message = 'users';
    this.showUserEditForm = false;
  };

  async activate(){
    await this.getUsers();
  }
  
  async getUsers(){
    await this.users.getUsers();
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

  };

  async save() {
    if (this.user && this.user.firstName && this.user.lastName
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
  }
}





