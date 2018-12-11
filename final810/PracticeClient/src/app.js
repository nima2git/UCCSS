//Week 12 - Aurelia Authentication Slide 6


//WEEK 10 - AURELIA ROUTING BASICS PP SLIDE 5
//THIS CODE BELOW IS USED IN PLACE OF THE CODE BLOCK ABOVE

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {
        route: ['', 'todos'],  //WEEK 11 Navigation PP SLIDE 2, updating to make landing the default route & home just another route
        moduleId: './modules/todos',
        name: 'Todos'
      }
    ]);
  }
}
