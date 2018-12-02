import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class User {
    constructor(data) {
        this.data = data;
        this.USER_SERVICE = 'users';    // THIS PART DOES THE "/USER" IN THE URL
    }

    //CODE BLOCK BELOW FROM WEEK 10 AURELIA DATA LAYER PP SLIDE 12
    //The async/await construction causes the application to pause until the await
    //statement is resolved
    async saveUser(user) {
        if (user) {
            let serverResponse = await this.data.post(user, this.USER_SERVICE);
            return serverResponse;
        }
    }


    //CODE BLOCK BELOW FROM WEEK 11 AURELIA Users PP slide 4
    async getUsers() {
        let response = await this.data.get(this.USER_SERVICE);
        if (!response.error) {
            this.usersArray = response;
        } else {
            this.usersArray = [];
        }
    }

}







