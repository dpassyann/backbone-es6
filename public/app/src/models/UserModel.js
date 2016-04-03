/**
 * Created by yanndeungoue on 02/04/2016.
 */

import Backbone from "backbone";

export default class UserModel extends Backbone.Model{

    defaults(){
        this.attributes.login = "yann";
        this.attributes.password = "toto";
        this.attributes.connected = false;
    }

    initialize(){
        this.on("change:login", this.onChangeLogin);
    }

    onChangeLogin(){
        console.log("login => ", this.attributes.login);
    }

    validate(attrs){
        let errors = [];

        if( typeof attrs.login !== "string" ){
            errors.push("Le type pour login doit être string");
        }if( attrs.login.length === 0 ){
            errors.push("Veuillez renseigner un login");
        }if( typeof attrs.password !== "string" ){
            errors.push("Le type pour password doit être string");
        }if( attrs.password.length < 8 ){
            errors.push("Il faut au moins 8 caractères pour password");
        }if( typeof attrs.connected !== "boolean" ){
            errors.push("Le type pour connected doit être booléen");
        }

        if( errors.length > 0 ){
            console.log( errors );
            return errors;
        }

    }
    
}