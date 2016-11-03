'use strict';

/* Controllers */

angular
  .module('Madera', ['ui.bootstrap','ngSanitize','angular.filter'])
  /////////////////////////////// Sign in controller  ///////////////////////////////////////////////////
  .controller('connectCtrl', ['$scope', function($scope) {
    var user ="user";
    var pass = "pass";
    console.log("coucou");
    $scope.checkUser= function () {
    // Récupération de variables, voir : http://www.w3schools.com/angular/tryit.asp?filename=try_ng_form
      console.log("name : " + $scope.login);
      console.log("pass : " + $scope.pass);
      //var urlHor = "http://app-f84c6d3d-ce9d-4499-a234-4cfcdd148e5e.cleverapps.io/user/auth";
      console.log("user récup = "+user);
      if ($scope.login == user) {
        if ($scope.pass == pass) {
            console.log("connexion ok");
          }
        }else {
          console.log("Aucun utilisateur de ce nom la");
        }
      };
    }])

  /////////////////////// Header controler (navbar) ////////////////////////////////////////////////
  .controller('HeaderController', ['$scope', function($scope) {
    function HeaderController($scope, $location){
      $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
      };
    }
}])
  ////////////////////////  list controler  ///////////////////////////////////////////////////////
  .controller('customersCtrl', function($scope, $http) {
    $scope.sortType     = 'num_devis'; // tri sur le num_devis par defaut
    $scope.sortReverse  = false;  // sens du tri par defaut
    $scope.searchText   = ''; // entrée saisie pour filtre
    $http.get("listeDevis.json").then(function(response) {
      $scope.datas = response.data;
      });
  })

  // Formulaire client
    .controller('formCtrl', function($scope, $http) {
      $http.get("client.json").then(function(response) {
          $scope.datas = response.data;
      });
       console.log("test");

$scope.oneAtATime = true;

    });

