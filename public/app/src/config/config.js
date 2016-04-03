/**
 * Created by yanndeungoue on 31/03/2016.
 */

/**
 * Méthode anonyme pour injecter l'adresse du service web. c'est assez élégant surtout si on travaille avec les promise
 * Mais bon avec le model backbone avec les méthodes save, fetch [...] on utlisera un bon vieux string. 
 */
(function(){

    var hostname = "http://localhost:8080";

    window.myConfig = {
        security: false,
        hostname: hostname,
        restServices: hostname + "/rest/"
    };

})();