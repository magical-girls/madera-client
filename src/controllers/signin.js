/////////////////////// Sign in controller  /////////////////////////////////////////////////
app.controller('signinCtrl', function ($scope, $rootScope, $location, $window, authentification, commonCode) {
  $scope.setToken = function () {
    if (!angular.isUndefined($scope.login) || !angular.isUndefined($scope.pass)) {
    //  console.log( await authentification.setToken($scope.login, $scope.pass));
    var check = authentification.setToken($scope.login, $scope.pass);
      // $scope.readToken = authentification.readToken();
      console.log("check = "+check);
      if (check) {
        $location.url("/accueil");
        console.log("connection succeed");
      } else {
        // normalement failed et rester sur sign in
        $location.url("/accueil");
        console.log("connection failed");
      }
    } else {
      commonCode.showAlertFieldsEmpty();
    }
  };
})
/*
var encodedpass= window.btoa(unescape(encodeURIComponent($scope.pass)));
      console.log("encoded = " +encodedpass);
      console.log("decoded = " + window.atob(unescape(encodeURIComponent(encodedpass))));
      */

/////////////////////// Sign in controller  /////////////////////////////////////////////////
/*app.controller('signinCtrl', function ($timeout, $scope, $location, $window, authentification, commonCode) {
  $scope.setToken = function () {
    if (!angular.isUndefined($scope.login) || !angular.isUndefined($scope.pass)) {
      var check;
      check = authentification.setToken($scope.login, $scope.pass);
      
      // $scope.readToken = authentification.readToken();
      $timeout($scope.setToken, 5000);
      console.log("check =" + check);
      if (check) {
        $location.url("/accueil");
        console.log("connection succeed");
      } else {
        // normalement failed et rester sur sign in
        $location.url("/accueil");
        console.log("connection failed");
      }
    } else {
      commonCode.showAlertFieldsEmpty();
    }
  };
})
/*
var encodedpass= window.btoa(unescape(encodeURIComponent($scope.pass)));
      console.log("encoded = " +encodedpass);
      console.log("decoded = " + window.atob(unescape(encodeURIComponent(encodedpass))));
      */