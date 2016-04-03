/**
 * Created by yanndeungoue on 30/03/2016.
 */

import Marionette from "backbone.marionette";

import MainRegion from "../regions/MainRegion";

import LoginView from "../views/LoginView";

import * as sharedConstant from "../config/SharedUtils";

import UserModel from "../models/UserModel";

export default class HomeController extends Marionette.Controller {
    /**
     * Méthode qu'expose mon controlleur pour réponde à un path donné
     * (voir comment faire quand on a des request param dans la requête -- à voir dans la version 2)
     */
    home() {
        console.log("I'm homeController");

        let model = new UserModel();

        let view = new LoginView({model : model});
        
        let region = new MainRegion({el:sharedConstant.CONTAINER});
        
        region.show(view);
    }
}

