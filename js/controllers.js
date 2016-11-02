'use strict';

/* Controllers */

angular
  .module('Madera', [])
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

  ////////////////////////  Accueil controler  ///////////////////////////////////////////////////////
  /////////////////////// Header controler (navbar) ////////////////////////////////////////////////


.controller('HeaderController', ['$scope', function($scope) {
  function HeaderController($scope, $location){
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }
}])

  .controller('customersCtrl', function($scope, $http) {
      $http.get("list.json").then(function(response) {
          $scope.datas = response.data;
      });
       $scope.datas =$scope.datas.query();
  });
