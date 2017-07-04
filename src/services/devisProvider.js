'use strict';
// pour filtre dans select
var devisLabel = [{
        "name": "Référence",
        "value": "reference"
    },
    {
        "name": "Client",
        "value": "client"
    },

    {
        "name": "Création",
        "value": "creation"
    },
    {
        "name": "Dernière modification",
        "value": "modif"
    },
    {
        "name": "Etat",
        "value": "status"
    }
];

function getIndexDevisFromId(inputDevis, inputIdDevis) {
    var result = null;
    for (var i = 0; i < inputDevis.length; i++) {
        if (inputIdDevis == (inputDevis[i].num_devis)) {
            result = i;
        }
    }
    return result;
}

app.service('devisProvider', function($http, $window, $routeParams) {
    this.getDevis = function() {
        //url get devis
        return {
            async: function() {
                return $http({
                    method: 'GET',
                    url: host + 'devis',
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }

    this.getaDevis = function(id) {
        //url get devis
        return {
            async: function() {
                return $http({
                    method: 'GET',
                    url: host + 'devis',
                    params: {
                        'id': id
                    },
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
    this.sendEmail = function(id) {
        //url get devis
        return {
            async: function() {
                return $http({
                    method: 'GET',
                    url: host + 'mail',
                    params: {
                        'id': id
                    },
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
    this.getDevisLabels = function() {
        return devisLabel;
    }
    this.deleteDevis = function(refDevis) {
        return {
            async: function() {
                return $http({
                    url: host + 'devis',
                    method: "DELETE",
                    data: refDevis,
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
    this.createDevis = function(nomClient, prenomClient, naissanceClient, telClient, adresseClient, professionClient, mailClient, idMatriculeSalarie,
        referenceDevis, motifDevis, margeComDevis, margeEntDevis, idReferenceGamme, listeModule) {
        //url get devis
        return {
            async: function() {

                return $http({
                    url: host + 'devis',
                    method: "POST",
                    data: {
                        "nomClient": nomClient,
                        "prenomClient": prenomClient,
                        "naissanceClient": naissanceClient,
                        "telClient": telClient,
                        "adresseClient": adresseClient,
                        "professionClient": professionClient,
                        "mailClient": mailClient,
                        "idMatriculeSalarie": idMatriculeSalarie,
                        "referenceDevis": referenceDevis,
                        "motifDevis": motifDevis,
                        "margeComDevis": margeComDevis,
                        "margeEntDevis": margeEntDevis,
                        "idReferenceGamme": idReferenceGamme,
                        "modules": listeModule,
                    },
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
    this.updateDevis = function(client, devis, gamme, modules) {
        //url get devis
        return {
            async: function() {

                return $http({
                    url: host + 'devis',
                    method: "PUT",
                    data: {
                        "client": client,
                        "devis": devis,
                        "gamme": {
                            "idReference": gamme,
                            "nom": null,
                            "commentaire": null
                        },
                        "modules": modules
                    },
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
})