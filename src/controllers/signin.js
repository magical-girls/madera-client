/////////////////////// Sign in controller  /////////////////////////////////////////////////
app.controller('signinCtrl', function ($scope, $rootScope, $location, $window, authentification, commonCode) {
  $scope.setToken = function () {
    if (!angular.isUndefined($scope.login) || !angular.isUndefined($scope.pass)) {
      var check = authentification.setToken($scope.login, $scope.pass);
      $scope.readToken = authentification.readToken();
      console.log("check = "+check);
      if (check) {
        $location.url("/accueil");
        console.log("connection succeed");
      } else {
        $location.url("/accueil");
        console.log("connection failed");
      }
    } else {
      commonCode.showAlertFieldsEmpty();
    }
  };
})