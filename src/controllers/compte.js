app.controller('compteCtrl', function ($scope, $routeParams, userProvider, $mdDialog) {
    userProvider.getUser().async().then(function(response){
    	$scope.user =  response.data;
	  }, function(error){
		  alert('Erreur de connexion');
	  });
})