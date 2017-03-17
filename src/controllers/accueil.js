  /////////////////////// Accueil controller //////////////////////////////////////////////////
  app.controller('accueilCtrl', function ($window, $scope, authentification, $location) {
    $scope.authentification = authentification.validate('');

    if($window.sessionStorage.getItem('login') != null){
    	$scope.login = $window.sessionStorage.getItem('prenom') + " " + $window.sessionStorage.getItem('nom');
    }
  })