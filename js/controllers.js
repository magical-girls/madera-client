'use strict';

/* Controllers */


angular
  .module('Madera', ['ui.bootstrap', 'ngSanitize', 'angular.filter', 'ngRoute'])
  .config(['$routeProvider',
    function ($routeProvider) {
      // Système de routage
      $routeProvider
        .when('/index', {
          templateUrl: 'index.html',
          controller: 'connectCtrl'
        })
        .when('/accueil', {
          templateUrl: 'accueil.html',
          controller: 'accueilCtrl'
        })
        .when('/liste_devis', {
          templateUrl: 'liste_devis.html',
          controller: 'listDevisCtrl'
        })
        .when('/edit_devis', {
          templateUrl: 'devis.html',
          controller: 'formCtrl'
        })
        .when('/catalogue', {
          templateUrl: 'list_catalogue.html',
          controller: 'catalogueCtrl'
        })
        .when('/compte', {
            templateUrl: 'compte.html',
            controller: 'compteCtrl'
        })
        .otherwise({
          redirectTo: '/accueil'
        });
    }
  ])
  /////////////////////////////// Sign in controller  ///////////////////////////////////////////////////
  .controller('connectCtrl', ['$scope', '$ngRoute', function ($scope, $ngRoute) {
    var user = "user";
    var pass = "pass";
    var alert =[];
    $scope.checkUser = function () {
      // Récupération de variables, voir : http://www.w3schools.com/angular/tryit.asp?filename=try_ng_form
      //var urlHor = "http://app-f84c6d3d-ce9d-4499-a234-4cfcdd148e5e.cleverapps.io/user/auth";
      console.log("user récup = " + user);
      if ($scope.login == user) {
        if ($scope.pass == pass) {
          console.log("connexion ok");
        }
      } else {
        $scope.alerts.push({type: 'danger', msg: 'Identifiants incorrects'});
      }
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
  }])

  /////////////////////// Header controler (navbar) ////////////////////////////////////////////////
  .controller('navbarController', ['$scope', function ($scope) {
    function navbarController($scope, $location) {
      $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
      };
    }
  }])
  //////////////////////// devis list controler  ///////////////////////////////////////////////////////
  .controller('listDevisCtrl', function ($scope, $http, $modal) {
    $scope.sortType = 'num_devis'; // tri sur le num_devis par defaut
    $scope.sortReverse = false;  // sens du tri par defaut
    $scope.searchText = ''; // entrée saisie pour filtre
    $http.get("liste_devis.json").then(function(response) {
      $scope.datas = response.data;
    });

    $scope.confirmDelete = function () {
      var dialogOpts = {
        backdrop: true,
        keyboard: true,
        templateUrl: 'modal_sup.html', // Url du template HTML
        controller: ['$scope', '$modalInstance', 'scopeParent', 'id',
          function ($scope, $modalInstance, scopeParent, id) { //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
            $scope.delete = function () {
              //Suppression du devis
              //scopeParent.delete(id);
              $modalInstance.close(); //on ferme le modal
            };
            $scope.cancel = function () {
              // Appel à la fonction d'annulation.
              $modalInstance.dismiss('cancel');
            };
          }
        ],
        resolve: {
          scopeParent: function () {
            return $scope; //On passe à la fenêtre modal une référence vers le scope parent.
          },
          id: function () {
            return $scope.id; // On passe en paramètre l'id de l'élément à supprimer.
          }
        }
      };
      //Ouverture de la fenêtre
      $modal.open(dialogOpts);
    };

    $scope.getAvancementColor = function (input) {
      /*if (input == "en attente") {
        return "orangeFont";
      }
      else*/ if (input == "refusé") {
        return "bold redFont";
      }
      /*else if (input == "validé") {
        return "greyFont";
      }
      else if (input == "en cours") {
        return "blueFont";
      }*/
      else if (input == "terminé") {
        return "bold greenFont";
      }

    }

  })

  // Formulaire client
  .controller('formCtrl', function ($scope, $http) {
    
    $http.get("devis.json").then(function (response) {
      $scope.datas = response.data;
    });
    $scope.isEmpty = function (input) {
      console.log(input[0]);
      if (input[0] != undefined) {
        return true;
      } else {
        return false;
      }
      //return true; //$scope.data && $scope.data.client && $scope.data.client.adhesion.dateDepart && $scope.data.client.adhesion.dateDepart.substring(6) == $scope.currentYear;
    }

    // Retourne un glyphicon avec une couleur verte si les champs sont bien remplis
    $scope.getIconValidator = function (input) {
      var result = true;
      for (var i = 0; i < input.length; i++) {
        if (input[i] == undefined || input[i] == "") {
          result = false;
        }
      }
      if (result == false) {
        return "redFont glyphicon glyphicon-remove";
      } else {
        return "greenFont glyphicon glyphicon-ok";
      }
    }

    $scope.oneAtATime = true;

    $http.get("devis.json").then(function (response) {
      $scope.devis = response.data;
    });

    $http.get("catalogue.json").then(function (response) {
      $scope.catalogue = response.data;
      //$scope.catalogue.push({"id": "5","nom_gamme": "Gamme 2" });
    });

    $scope.choixCatalogue = [];

    $scope.addChoixCatalogueRow = function(inputNomGamme, inputNomModule, inputNomComposant){
      $scope.choixCatalogue.push({'nom_gamme':inputNomGamme, 'nom_module': inputNomModule, 'nom_composant':inputNomComposant});
      /*$scope.name='';
      $scope.employees='';
      $scope.headoffice='';*/
    }

  })

  .directive("test", function () {
    return {
      // A = attribut, C= classe, E = element
      restrict: 'A',
      link: function (scope, element, attrs) {
        if (attrs.class == "reussi") {
          element.addClass('text-success');
        }
      }
    }
  })
  //////////////////////// sub menu catalogue controler/////////////////
  .controller('submenuCtrl', ['$scope', function ($scope) {

  }])
  //////////////////////// page d'accueil /
  .controller('accueilCtrl', ['$scope', function ($scope) {

  }])
  /////////////////////// Compte controler ///////////////////////////
  .controller('compteCtrl', ['$scope', '$http', function ($scope, $http) {
    var modifier=false;
    var errMsg="";
    $scope.alerts = []; //Contiendra toutes les alerts à afficher
    $http.get("compte.json").then(function (response) {
      $scope.users = response.data;
    });
      $scope.verifCompte = function () { //pour l'instant on teste seulement que les deux mots de passe sont identiques
        var ok=false;
        if ($scope.pass1 != $scope.pass2) {
           $scope.alerts.push({type: 'danger', msg: 'Mots de passe incorrect'}); // on crée une alert erreur
        }else{
          ok=true;
        }
        if(ok){
          //faire les changement dans la bdd
          modifier=false; // changement effectués, on affiche plus le formulaire
          $scope.alerts.push({type: 'success', msg: 'Changement effectués'}); // on crée une alert succes
        }
      };
      // pour fermer les alerts
      $scope.closeAlert = function(index) {
          $scope.alerts.splice(index, 1);
        };
  }]);
