  /////////////////////// Accueil controller //////////////////////////////////////////////////
  app.controller('accueilCtrl', function ($window, $scope, authentification, sharedProperties) {
    $scope.authentification = authentification.validate('');
    sharedProperties.getPropertyFromJson().then(function (d) {
      $scope.jsonFromHttpget = d;
    });
    if($window.sessionStorage.getItem('login') != null){
    	console.log($window.sessionStorage.getItem('login'));
    	$scope.login = $window.sessionStorage.getItem('login');
    }
  })