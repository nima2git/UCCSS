// export class App {
//   constructor() {
//     this.message = 'Hello World!';
//   }
// }


//WEEK 10 - AURELIA ROUTING BASICS PP SLIDE 5
//THIS CODE BELOW IS USED IN PLACE OF THE CODE BLOCK ABOVE

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      },
      {
        route: 'users',
        moduleId: './modules/users',
        name: ' Users'
      }
    ]);
  }
}
