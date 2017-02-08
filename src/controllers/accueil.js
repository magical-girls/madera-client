  /////////////////////// Accueil controller //////////////////////////////////////////////////
  app.controller('accueilCtrl', function ($scope, authentification, sharedProperties) {
    $scope.authentification = authentification.validate('');
    sharedProperties.getPropertyFromJson().then(function (d) {
      $scope.jsonFromHttpget = d;
    });
  })