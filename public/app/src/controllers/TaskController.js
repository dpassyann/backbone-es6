/**
 * Created by yanndeungoue on 31/03/2016.
 */

import Marionette from "backbone.marionette";

export default class TaskController extends Marionette.Controller{
    /**
     * Méthode qu'expose mon controlleur pour répondre à un path.
     */
    tasks(){
        console.log("List all the tasks");
    }
}
