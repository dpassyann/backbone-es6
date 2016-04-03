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
    /**
     * ICI lors de l'instanciation de la vue on lui affecte son template par défaut et le model
     * dont elle va gérer le rendu --- on ne redéfinit la méthode renderer que quand on aura des trucs spécifics à faire
     * Notamment lors de l'affichage d'une collection ...
     * contructeur
     * @param options
     */
    initialize(options){
        this.template = templateViem;
        this.model = options.model;
        console.log("Instanciation de la vue");
    }

    /**
     * Ici on cable les évènements des éléments du DOM avec des méthodes
     * @override
     * @returns {{[click @ui.button]: string, [change @ui.loginInputText]: string, [change @ui.passwordInputText]: string}}
     */
    events(){
        return {
            "click @ui.button"               :"connect",
            "change @ui.loginInputText"      :"onLoginChange",
            "change @ui.passwordInputText"   :"onPasswordChange"
        };
    }

    /**
     * Ici on cable les éléments du DOM qu'on stocke dans un tableau "associatif" ui qui nous permettra de les réutiliser comme objet
     * @override
     * @returns {{button: string, loginInputText: string, passwordInputText: string}}
     */
    ui(){
        return {
            button              :   ".login-button",
            loginInputText      :   ".login",
            passwordInputText   :   ".password"
        };
    }

    /**
     * Permet de personnaliser le tag parent qui va englobler ton template et donc ta vue.
     * NE PAS LA LASSER VIDE ou mettre "SPAN"
     * si on ne la redéfinit pas elle renvoie une "<div>"
     * @returns {string}
     */
    tagName(){
        return "p";
    }

    /**
     * classe CSS qu'on affectera directement au au container parent de cette vue
     * @returns {string}
     */

    className(){
        return "login-center";
    }

    onLoginChange(){
        this.model.setLogin( this.ui.loginInputText.val() );
    }

    onPasswordChange(){
        this.model.set("password", this.ui.passwordInputText.val());
    }

    connect(){
        if( this.model.getLogin() === "dpassyann" && this.model.get("password") === "deungoue" ){
            this.model.set("connected", true);
            this.model.save();
        }
        console.log("this", this.model.toJSON());
    }

}