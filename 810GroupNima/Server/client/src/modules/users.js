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
  constructor(router, users) {
    this.router = router;
    this.users = users;
    this.message = 'Users';
    this.showUserEditForm = false;
  }

  //I was originally getting red errors here but after restarting the program the errors are gone.  
  //when I look at the code from the client side though its giving a error connection refused...
  //When i look closer at that same error code it says its coming from vendor-bundle.js which is index.html file.
  async activate() {
    await this.getUsers();
  }

  //this is from week 11 Aurelia users pp slide 10
  attached() {
    feather.replace()
  }


  async getUsers() {
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
    this.openEditForm();
  }


  editUser(user) {
    this.user = user;
    this.openEditForm();
  }

  openEditForm() {
    this.showUserEditForm = true;
    setTimeout(() => { $("#firstName").focus(); }, 500);
  }

  changeActive(user) {
    this.user = user;
    this.save();
  }


  async save() {
    if (this.user && this.user.firstName && this.user.lastName
      && this.user.email && this.user.password)
      await this.users.saveUser(this.user);
    await this.getUsers();
    this.back();
  }

  async delete() {
    if (this.user) {
      await this.users.delete(this.user);
      await this.getUsers();
      this.back();
    }
  }


  //This back code is from Week 11 Aurelia Users PP Slide 17, connects to editUser.html so that you can click the back button
  //after adding a user
  back() {
    this.showUserEditForm = false;
  }

}





