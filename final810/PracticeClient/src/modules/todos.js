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
import { Todo } from '../resources/data/todo-object';

@inject(Router, Todo)

export class Todos {
  constructor(router, todos) {
    this.router = router;
    this.todos = todos;
    this.message = 'Todos';
    this.showTodoEditForm = false;
  }

  //I was originally getting red errors here but after restarting the program the errors are gone.  
  //when I look at the code from the client side though its giving a error connection refused...
  //When i look closer at that same error code it says its coming from vendor-bundle.js which is index.html file.
  async activate() {
    await this.getTodos();
  }

  //this is from week 11 Aurelia users(todo) pp slide 10
  attached() {
    feather.replace()
  }


  async getTodos() {
    await this.todos.getTodos();
  }


  newTodo() {
    this.todo = {
      todo: "",
      priotity: "High",
      done: true,
    }
    this.openEditForm();
  }


  editTodo(todo) {
    this.todo = todo;
    this.openEditForm();
  }

  openEditForm() {
    this.showTodoEditForm = true;
    setTimeout(() => { $("#todo").focus(); }, 500);
  }

  changeDone(todo) {
    this.todo = todo;
    this.save();
  }


  async save() {
    if (this.todo && this.todo.todo && this.todo.priotity)
      await this.todos.saveTodo(this.todo);
    await this.getTodos();
    this.back();
  }

  async delete() {
    if (this.todo) {
      await this.todos.delete(this.todo);
      await this.getTodos();
      this.back();
    }
  }



  
  //This back code is from Week 11 Aurelia Users PP Slide 17, connects to editUser.html so that you can click the back button
  //after adding a todo
  back() {
    this.showTodoEditForm = false;
  }

}



