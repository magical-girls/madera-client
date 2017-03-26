'use strict';
// pour filtre dans select
var devisLabel = [
  {
    "name": "N° devis",
    "value": "num_devis"
  },
  {
    "name": "Client",
    "value": "nom_client"
  },
  {
    "name": "Création",
    "value": "date_creation"
  },
  {
    "name": "Dernière modification",
    "value": "date_modif"
  },
  {
    "name": "Etat",
    "value": "etat"
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

app.service('devisProvider', function ($http, $window, $routeParams) {
  this.getDevis = function () {
    //url get devis
    return {
      async: function () {
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
  this.deleteDevis = function (inputDevis, inputNumDevis) {
    inputDevis.splice(getIndexDevisFromId(inputDevis, inputNumDevis), 1);
  }

  this.getaDevis = function (id) {
    //url get devis
    return {
      async: function () {
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
  this.getDevisLabels = function () {
    return devisLabel;
  }

  this.saveDevis = function (nomClient, prenomClient, naissanceClient, telClient, adresseClient, professionClient, mailClient, idMatriculeSalarie,
    referenceDevis, motifDevis, margeComDevis, margeEntDevis, idReferenceGamme,idRefModule,commentaireModule,sectionLongeur,refModule, angleType, angleDegre,moduleA,moduleB) {
    //url get devis
    return {
      async: function () {
        return $http({
          url: host + 'devis',
          method: "POST",
          data: {
            'nomClient': nomClient,
            'prenomClient': prenomClient,
            'naissanceClient': naissanceClient,
            'telClient': telClient,
            'adresseClient': adresseClient,
            'professionClient': professionClient,
            'mailClient': mailClient,
            'idMatriculeSalarie': idMatriculeSalarie,
            'referenceDevis': referenceDevis,
            'motifDevis': motifDevis,
            'margeComDevis': margeComDevis,
            'margeEntDevis': margeEntDevis,
            'idReferenceGamme': idReferenceGamme,
            'lstModule':
            [
              {
                'idReference': idRefModule,
                'commentaire': commentaireModule
              }
            ],
            'lstSection':
            [
              {
                'longueur': sectionLongeur,
                'refModule': refModule
              }
            ],

            'lstAngle':
            [
              {
                'type': angleType,
                'degre': angleDegre,
                'moduleA': moduleA,
                'moduleB': moduleB
              }
            ]
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
