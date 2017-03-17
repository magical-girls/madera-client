/////////////////////// Lists controller  /////////////////////////////////////////////////
app.controller('catalogueCtrl', function ($scope, $routeParams, catalogueProvider, $mdDialog, commonCode, $location, authentification) {
	$scope.authentification = authentification.validate('');
    if(!$scope.authentification){
    	$location.url("/signin");
    }
    $scope.edit = $routeParams.edit;
    
    catalogueProvider.getGammes().async().then(function(response){
    	$scope.datasGammes = response.data;
    	$routeParams.gammes = response.data;
    }, function(error){
    	commonCode.alertErreur();
    })
    
    $scope.datasModules = catalogueProvider.getModules().async().then(function(response){
    	$scope.datasModules = response.data;
    	$routeParams.modules = response.data;
    }, function(error){
    	commonCode.alertErreur();
    })
    
    $scope.datasComposants = catalogueProvider.getComposants().async().then(function(response){
    	$scope.datasComposants = response.data;
    	$routeParams.composants = response.data;
    }, function(error){
    	commonCode.alertErreur();
    })

    $scope.deleteSomething = function ($event, action) {
    	if($routeParams.edit){
    		commonCode.showConfirm($event, action);
    	} else {
    		commonCode.showForbidden();
    	}
    }
    /// FAB 
    $scope.addToCatalogue = function ($type) {
    	if($routeParams.edit){
    		$location.url("/editCatalogue/true/" + $type + "/" + "new");
    	} else {
    		commonCode.showForbidden();
    	}
    }
    $scope.editCatalogue = function ($type, $id, $edit) {
    	if($edit == false){
    		$location.url("/editCatalogue/" + $edit + "/" + $type + "/" + $id);
    	} else {
    		commonCode.showForbidden();
    	}
    }
   
})
