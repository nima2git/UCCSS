// export class Home {
// 	constructor(){
// 		this.message = "Home Page";
// 	}
// }



//CODE BLOCK BELOW IS REPLACING THE ONE ABOVE
//FROM WEEK 10 AURELIA ROUTING BASICS SLIDE 9

import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';


@inject(Router)
export class Home {
  constructor(router) {
	this.router = router;
          this.message = 'Home';
  }

  login(){
	  this.router.navigate('users');
  }
}



