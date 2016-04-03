/**
 * Created by yanndeungoue on 31/03/2016.
 */

import Marionette from "backbone.marionette";


import templateViem from "../templates/login-template.hbs";


export default class LoginView extends Marionette.ItemView{

    /**
     * si méthode initialize pas besoin de redefinir le constructeur
     * @param options
     */
    /*
    constructor(options){ 
        super(options);
    }
    */
    initialize(options){
        this.template = templateViem;
        this.model = options.model;
        console.log("Instanciation de la vue");
    }

    events(){
        return {
            "click @ui.button"               :"connect",
            "change @ui.loginInputText"      :"onLoginChange",
            "change @ui.passwordInputText"   :"onPasswordChange"
        };
    }

    ui(){
        return {
            button              :   ".login-button",
            loginInputText      :   ".login",
            passwordInputText   :   ".password"
        };
    }

    onLoginChange(){
        this.model.set("login", this.ui.loginInputText.val());
    }

    onPasswordChange(){
        this.model.set("password", this.ui.passwordInputText.val());
    }

    connect(){
        if( this.model.get("login") === "dpassyann" && this.model.get("password") === "deungoue" ){
            this.model.set("connected", true);
        }
        console.log("this", this.model.toJSON());
    }

}