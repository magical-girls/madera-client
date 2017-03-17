///////////////////// Edit devis controller /////////////////////////
app.controller('editDevisCtrl', function ($scope, $routeParams, devisProvider, userProvider,
		catalogueProvider, $mdDialog, $window, $location, authentification) {
	$scope.authentification = authentification.validate('');
    if(!$scope.authentification){
    	$location.url("/signin");
    }
  // Vérification du mode edition (activé ou non)
  $scope.edit = $routeParams.edit;
  var id = $routeParams.id;
  $scope.addClientComment = false;
  $scope.addCommercialComment = false;
  //Récupération des données
  if ("new" != id) { //si on edit, récupération des données du devis
    console.log("id n'est pas new :" + id);

    $scope.devisData = devisProvider.getaDevis();
    $scope.clientData = userProvider.getClient();
  } else {
    console.log("id est new: " + id);
  }
  $scope.comData = userProvider.getUser();
  $scope.gammes = catalogueProvider.getGammes();
  $scope.modules = catalogueProvider.getModules();
  $scope.composants = catalogueProvider.getComposants();
  //Gestion des commentaires
  $scope.clientComment = [];
  $scope.commercialComment = [];
  $scope.addComment = function (txt, target) {
    if (target == 'client') {
      $scope.clientComment.push({ 'id_row': new Date().getTime(), 'comment_txt': txt, 'comment_date': new Date().getTime() });
      $scope.clientCommentary = null;
      $scope.addClientComment = false;
    } else {
      $scope.commercialComment.push({ 'id_row': new Date().getTime(), 'comment_txt': txt, 'comment_date': new Date().getTime() });
      $scope.commercialCommentary = null;
      $scope.addCommercialComment = false;
    }
  };
  // initialisation des choix (tableau)
  $scope.choixCatalogue = [];
  $scope.addChoixCatalogueRow = function (inputNomGamme, inputNomModule, inputLongueur, inputAngle) {
    $scope.choixCatalogue.push({ 'id_row': new Date().getTime(), 'nom_gamme': inputNomGamme, 'nom_module': inputNomModule, 'longueur': inputLongueur, 'angle': inputAngle });
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
  };

  //Récupérer les modules correspondants à la gamme
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
  /* $scope.getMatchComposant = function (inputId, inputIdComposant) {
     var resultMatchComposant = false;
     for (var i = 0; i < inputIdComposant.length; i++) {
       if (inputIdComposant[i] == inputId) {
         resultMatchComposant = true
       }
     }
     return resultMatchComposant;
   }*/
  // Gestion du nombre d'angles
  $scope.nbAngle = [];
  $scope.setNbAngle = function () {
    $scope.nbAngle = [];
    max = $scope.nbSection;
    for (var i = 1; i < max; i++) {
      $scope.nbAngle.push(i);
    }
  };
  // Bouton retour
  $scope.returnFunction = function () {
    $window.history.back();
  };
})