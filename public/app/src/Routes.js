/**
 * Created by yanndeungoue on 30/03/2016.
 */

import Marionette from "backbone.marionette";


export default class Routes extends Marionette.AppRouter {


    constructor(){
        super();
    }

    /**
     * C'est une bonne pratique de redéfinir cette méthode ça permet d'intercepter un routage
     * de préparer d'éventuel donnée et de le tester avant de l'effectuer
     *
     * Il est aussi une bonne pratique quand on est dnas une application pluri modules.
     */
    onRoute(){
        console.log("I'm routing");
    }
}


