/**
 * Created by yanndeungoue on 31/03/2016.
 */

import Marionette from "backbone.marionette";

export default class TaskController extends Marionette.Controller{
    constructor(){
        super();
    }

    tasks(){
        console.log("List all the tasks");
    }
}
