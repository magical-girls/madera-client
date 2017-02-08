  /////////////////////// Sign in controller  /////////////////////////////////////////////////
 app.controller('signinCtrl', function ($scope, $rootScope, $location, $window, authentification) {
    $scope.setToken = function () {
      authentification.setToken();
      $scope.readToken = authentification.readToken();
    };
  })