// export class Home {
// 	constructor(){
// 		this.message = "Home Page";
// 	}
// }



//CODE BLOCK BELOW IS REPLACING THE ONE ABOVE
//FROM WEEK 10 AURELIA ROUTING BASICS SLIDE 9

import {inject} from 'aurelia-framework';

export class Home {
  constructor() {
          this.message = 'Home is where the heart is :)';
  }

  attached(){
    console.log('here')
  }

}



