///////////////////// Edit devis controller /////////////////////////
app.controller('editDevisCtrl', function ($scope, $routeParams, devisProvider, userProvider,
  catalogueProvider, $mdDialog, $window, $location, authentification, commonCode) {
  $scope.authentification = authentification.validate('');
  if (!$scope.authentification) {
    $location.url("/signin");
  }
  // Vérification du mode edition (activé ou non)
  $scope.choixCatalogue = [];
  $scope.edit = $routeParams.edit;
  var id = $routeParams.id;
  $scope.addClientComment = false;
  $scope.addCommercialComment = false;
  //Récupération des données
  if ("new" != id) { //si on edit, récupération des données du devis
    console.log("id n'est pas new :" + id);
    $scope.new = false;
    devisProvider.getaDevis(id).async().then(function (response) {
      $scope.devisData = response.data;
      //$scope.gammes = response.data.gamme;
      $scope.gammes = catalogueProvider.getGammes();//TODO
      $scope.modules = catalogueProvider.getModules();//TODO

      //	$scope.modules = response.data.lstModule;
      //	$scope.composants = response.data.lstComposant;
      /** A FAIRE, liste des choix après modif serveur dépendance section pour tri */
      //$scope.choixCatalogue.push({ 'id_row': new Date().getTime(), 'nom_gamme': inputNomGamme, 'nom_module': inputNomModule, 'longueur': inputLongueur, 'angle': inputAngle });


    }, function (error) {
      commonCode.alertErreur();
    });

  } else {
    console.log("id est new: " + id);
    $scope.new = true;

    $scope.comData = userProvider.getUser();
    $scope.gammes = catalogueProvider.getGammes();//TODO
    $scope.modules = catalogueProvider.getModules();//TODO
    $scope.composants = catalogueProvider.getComposants();//TODO

  }

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
  $scope.nbIteration = {};
  $scope.nbAngle = [];
  max = 0;
  $scope.setNbAngle = function () {
    $scope.nbAngle = [];
    max = $scope.nbSection;
    for (var i = 1; i < max; i++) {
      $scope.nbAngle.push(i);
    }
    console.log("max = " + $scope.nbSection)
  };
  // sauver donnees du devis
  $scope.createDevis = function () {
    // Récupérer les valeurs des segments
    /*$scope.segmentData=[];
    for(i=0; i<$scope.nbSection -1; i++){
      $scope.segmentData[i]= new Array;
      $scope.segmentData[i].push()
    }*/
    devisProvider.createDevis(
      $scope.devisData.client.nom,
      $scope.devisData.client.prenom,
      new Date(),
      $scope.devisData.client.tel,
      "adresseClient",
      null,
      $scope.devisData.client.mail,
      $scope.devisData.salarie.matricule,
      $scope.devisData.devis.reference,
      null,
      0,
      0,
      "G002",
      "M002",
      // $scope.gammes.idReferencesGamme,
      // $scope.modules.idReferencesGamme,
      null,
      15,
      "M001",
      1,
      15,
      "M001",
      "M002"
    ).async().then(function (response) {
      console.log("post ok");
    }, function (error) {
      commonCode.alertErreur();
    });
    // récupération des données à finir
  }
  // Bouton retour
  $scope.returnFunction = function () {
    $window.history.back();
  };
})