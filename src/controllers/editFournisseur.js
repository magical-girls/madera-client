 ///////////////////////////// Edit fournisseur controller ///////////////////////
 app.controller('editFournisseurCtrl', function ($scope, $routeParams, fournisseursProvider,
		 catalogueProvider, $mdDialog, $window, $location, authentification) {
	 $scope.authentification = authentification.validate('');
	    if(!$scope.authentification){
	    	$location.url("/signin");
	    }
    $scope.edit = $routeParams.edit;
    var id = $routeParams.id;

    $scope.gammes = catalogueProvider.getGammes();
    $scope.modules = catalogueProvider.getModules();
    $scope.composants = catalogueProvider.getComposants();

    $scope.fournisseurs = fournisseursProvider.getFournisseurs();

    // initialisation des choix (tableau)
    $scope.choixCatalogue = [];
    if (id != "new") {
      $scope.choixCatalogue.push({ 'id_row': "1", 'nom_gamme': "Ecologique", 'nom_module': "Cloison", 'nom_composant': "paille" });
      $scope.choixCatalogue.push({ 'id_row': "2", 'nom_gamme': "Ecologique", 'nom_module': "Sol", 'nom_composant': "carton" });
    }
    $scope.addChoixCatalogueRow = function (inputNomGamme, inputNomModule, inputNomComposant) {
      $scope.choixCatalogue.push({ 'id_row': new Date().getTime(), 'nom_gamme': inputNomGamme, 'nom_module': inputNomModule, 'nom_composant': inputNomComposant });
    };
    // Supprimer des éléments de la liste des choix
    $scope.removeChoixCatalogueRow = function (inputIdRow) {
      var index;
      for (var i in $scope.choixCatalogue) {
        var id_row = $scope.choixCatalogue[i].id_row;
        if (id_row == inputIdRow) {
          index = i;
          break;
        }
      }
      $scope.choixCatalogue.splice(index, 1);
    }
    ///////todo : mettre dans le code commun
  $scope.getMatchModule = function (inputId, inputIdGamme) {
      var resultMatchModule = false;
      for (var i = 0; i < inputIdGamme.length; i++) {
        if (inputIdGamme[i] == inputId) {
          resultMatchModule = true
        }
      }
      return resultMatchModule;
    }
    //Récupérer les composants correspondants au module
    $scope.getMatchComposant = function (inputId, inputIdModule) {
      var resultMatchComposant = false;
      for (var i = 0; i < inputIdModule.length; i++) {
        if (inputIdModule[i] == inputId) {
          resultMatchComposant = true
        }
      }
      return resultMatchComposant;
    }
    $scope.returnFunction = function () {
      $window.history.back();
    };
  })