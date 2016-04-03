/**
 * Created by yanndeungoue on 02/04/2016.
 */

import Backbone from "backbone";

export default class UserModel extends Backbone.Model {

    /***
     * @override
     * Je crée les attributs de mon model et je les initialise
     */
    defaults() {
        this.attributes.login = "YannDeunGoUe";
        this.attributes.password = "TiTO";
        this.attributes.connected = false;
    }

    /**
     * @override
     * contructeur de mon model où je cable les évènements que je vais écouter
     * expl : j'écoute tout changement sur l'attribut 'login' de mon model
     */
    initialize() {
        this.on("change:login", this.onChangeLogin);
    }

    onChangeLogin() {
        console.log("login => ", this.attributes.login);
    }

    /**
     * @override
     * Méthode de validation de mon model qui est appelé quand on fait un isValid
     * @param attrs : tableau associatif des attributs de mon modèle
     * @returns {Array} tableau d'erreurs
     */
    validate(attrs) {
        let errors = [];

        if (typeof attrs.login !== "string") {
            errors.push("Le type pour login doit être string");
        }
        if (attrs.login.length === 0) {
            errors.push("Veuillez renseigner un login");
        }
        if (typeof attrs.password !== "string") {
            errors.push("Le type pour password doit être string");
        }
        if (attrs.password.length < 8) {
            errors.push("Il faut au moins 8 caractères pour password");
        }
        if (typeof attrs.connected !== "boolean") {
            errors.push("Le type pour connected doit être booléen");
        }

        if (errors.length > 0) {
            console.log(errors);
            return errors;
        }

    }

    /**
     * Un des avantage de ES6 c'est de pouvoir faire ce genre de truc
     * Pour moi qui viens d'un monde Java ce setter me parle plus.
     * @param login
     */
    setLogin(login) {
        this.set("login", login);
    }

    /**
     * Pour les mêmes raisons que le setter : je trouve que ça peut rentrer dans les bonnes pratiques
     * @returns {*}
     */
    getLogin() {
        return this.get("login");
    }

    /**
     * Cette méthode permet d'échapper un attribut -- je crois qu'elle prend des paramètres ... je regarderai dans l'API tout à l'heure :p
     * il est aussi bien de l'utiliser pour éviter les injections de script à voir plus tard
     */
    escapeLogin() {
        this.escape("login");
    }

    /**
     * Méthode qui indique sur quel service REST est plugé ce model
     * ici le chemin est relatif : si on est dans le même domaine que le serveur exposant l'API REST
     * sinon on indique le chemin pleinement qualifié.
     * @override
     * @returns {string}
     */
    url() {
        return "/user";
    }

    /**
     * @override NE PAS LES REDEFINIR
     * Methode qui fera un POST sur l'url '/user'
     */
    //save()

    /**
     * @override NE PAS LES REDEFINIR
     * PUT sur la l'url '/user'
     */
    //update()

    /**
     * @override NE PAS LES REDEFINIR
     * DESTROY sur la l'url '/user'
     */
    //destroy()

}