/////////////////////// Sign in controller  /////////////////////////////////////////////////
app.controller('signinCtrl', function ($scope, $rootScope, $location, $window, authentification, commonCode) {
  $scope.setToken = function () {
    if (!angular.isUndefined($scope.login) || !angular.isUndefined($scope.pass)) {
      var check = authentification.setToken($scope.login, $scope.pass);
      $scope.readToken = authentification.readToken();
      if (check) {
        $location.url("/accueil");
      } else {
        console.log("connection failed");
        commonCode.alertErreur();
      }
    }else{
      commonCode.showAlertFieldsEmpty();
    }
  };
})