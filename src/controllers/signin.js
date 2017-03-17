  /////////////////////// Sign in controller  /////////////////////////////////////////////////
 app.controller('signinCtrl', function ($scope, $rootScope, $location, $window, authentification) {
    $scope.setToken = function () {
      var check = authentification.setToken($scope.login, $scope.pass);
      $scope.readToken = authentification.readToken();
      if(check){
    	  $location.url("/accueil");
      }
      
      
    };
  })