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
import { Foo } from '../resources/data/foo-object';

@inject(Router, Foo)

export class Foos {
  constructor(router, foos) {
    this.router = router;
    this.foos = foos;
    this.message = 'Foos';
    this.showFooEditForm = false;
  }

  //I was originally getting red errors here but after restarting the program the errors are gone.  
  //when I look at the code from the client side though its giving a error connection refused...
  //When i look closer at that same error code it says its coming from vendor-bundle.js which is index.html file.
  async activate() {
    await this.getFoos();
  }

  //this is from week 11 Aurelia users(foos) pp slide 10
  attached() {
    feather.replace()
  }


  async getFoos() {
    await this.foos.getFoos();
  }


  newFoo() {
    this.foo = {
      foo: "",
      woo: "boo"
    }
    this.openEditForm();
  }


  editFoo(foo) {
    this.foo = foo;
    this.openEditForm();
  }

  openEditForm() {
    this.showFooEditForm = true;
    setTimeout(() => { $("#foo").focus(); }, 500);
  }

  changeActive(foo) {
    this.foo = foo;
    this.save();
  }


  async save() {
    if (this.foo && this.foo.foo && this.foo.woo)
      await this.foos.saveFoo(this.foo);
    await this.getFoos();
    this.back();
  }

  async delete() {
    if (this.foo) {
      await this.foos.delete(this.foo);
      await this.getFoos();
      this.back();
    }
  }


  //This back code is from Week 11 Aurelia Users PP Slide 17, connects to editUser.html so that you can click the back button
  //after adding a user
  back() {
    this.showFooEditForm = false;
  }

}





