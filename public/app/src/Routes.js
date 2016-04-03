/**
 * Created by yanndeungoue on 30/03/2016.
 */

import Marionette from "backbone.marionette";


export default class Routes extends Marionette.AppRouter {


    constructor(){
        super();
    }

    onRoute(){
        console.log("I'm routing");
    }
}


