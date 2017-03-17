app.controller('compteCtrl', function ($scope, $routeParams, userProvider, $mdDialog, authentification) {
	$scope.authentification = authentification.validate('');
    if(!$scope.authentification){
    	$location.url("/signin");
    }
    userProvider.getUser().async().then(function(response){
    	$scope.user =  response.data;
	  }, function(error){
		  alert('Erreur de connexion');
	  });
})