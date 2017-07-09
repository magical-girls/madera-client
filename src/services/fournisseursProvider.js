'use strict';

var fournisseursLabel = [{
        "name": "nom",
        "value": "nom"
    },
    {
        "name": "téléphone",
        "value": "telephone"
    },

    {
        "name": "Adresse",
        "value": "adresse"
    }
];

function getIndexFournisseurFromId(inputGamme, inputIdGamme) {
    var result = null;
    for (var i = 0; i < inputGamme.length; i++) {
        if (inputIdGamme == (inputGamme[i].id_gamme)) {
            result = i;
        }
    }
    return result;
}


app.service('fournisseursProvider', function($http, $window) {
    this.getFournisseursLabels = function() {
        return devisLabel;
    }
    this.getFournisseurs = function() {

        //url get gamme
        return {
            async: function() {
                return $http({
                    method: 'GET',
                    url: host + 'fournisseur',
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
            }
        }
    }
    this.getFournisseurById = function(id) {
        return {
            async: function() {
                return $http({
                    method: 'GET',
                    url: host + 'fournisseur',
                    params: {
                        'id': id
                    },
                    headers: {
                        'token': $window.sessionStorage.getItem('token'),
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                })
            }
        }
    }
    this.deleteFournisseur = function(inputGamme, inputNumGamme) {
        inputGamme.splice(getIndexGammeFromId(inputGamme, inputNumGamme), 1);
    }

})