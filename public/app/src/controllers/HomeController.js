/**
 * Created by yanndeungoue on 30/03/2016.
 */

import Marionette from "backbone.marionette";

import MainRegion from "../regions/MainRegion";

import LoginView from "../views/LoginView";

import * as sharedConstant from "../config/SharedUtils";

import UserModel from "../models/UserModel";

export default class HomeController extends Marionette.Controller {
    
    home() {
        console.log("I'm homeController");

        let model = new UserModel();

        let view = new LoginView({model : model});
        
        let region = new MainRegion({el:sharedConstant.CONTAINER});
        
        region.show(view);
    }
}

