/**
 * Created by yanndeungoue on 30/03/2016.
 */
import Marionette from "backbone.marionette";
import Backbone from "backbone";
import Routes from "./Routes";

import TaskController from "./controllers/TaskController";
import HomeController from "./controllers/HomeController";

let app = window.app = new Marionette.Application();

app.onStart = () => {
    "use strict";
    if (Backbone.history) {
        Backbone.history.start();
    }
};

app.addInitializer(function () {
    var router =  new Routes();
    //*
    router.processAppRoutes(new HomeController(), {
        "":"home"
    });
    router.processAppRoutes(new TaskController(), {
        "task":"tasks"
    });
    //*/
    console.log("hello from the addInitializer.");
});

app.start();

