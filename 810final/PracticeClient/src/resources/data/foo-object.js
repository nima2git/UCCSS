import { inject } from 'aurelia-framework';
import { DataServices } from './data-services';
@inject(DataServices)
export class Foo {
    constructor(data) {
        this.data = data;
        this.FOO_SERVICE = 'foo';    // THIS PART DOES THE "/USER" IN THE URL
    }

    //week11 aurelia USERS pp Slide 19
    async saveFoo(foo) {
        let serverResponse;
        if (foo) {
            if (foo._id) {
                serverResponse = await this.data.put(foo, this.FOO_SERVICE);
            } else {
                serverResponse = await this.data.post(foo, this.FOO_SERVICE);
            }
            return serverResponse;
        }
    }

    async delete(foo) {
        if (foo && foo._id) {
            await this.data.delete(this.FOO_SERVICE + '/' + foo._id)
        }
    }



    //CODE BLOCK BELOW FROM WEEK 11 AURELIA Users PP slide 4
    async getFoos() {
        let response = await this.data.get(this.FOO_SERVICE);
        if (!response.error) {
            this.foosArray = response;
        } else {
            this.foosArray = [];
        }
    }

}







