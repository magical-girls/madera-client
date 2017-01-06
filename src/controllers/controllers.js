'use strict';

/* Controllers */

app
  /////////////////////// tabs controller  ///////////////////////////////////////////////////
  //Pour rediriger vers les bonnes routes
  .controller('tabCtrl', function ($scope, $location, $log) {
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function (current, old) {
      switch (current) {
        case 0:
          $location.url("/accueil");
          break;
        case 1:
          $location.url("/liste/devis");
          break;
        case 2:
          $location.url("/catalogue");
          break;
        case 3:
          $location.url("/liste/fournisseurs");
          break;
      }
    });
    $scope.showProfile = function (event) {
      $location.url("/compte");
      // TO DO ajouter en parametre identifiant user 
    };
  })
  /////////////////////// Signin controller  //////////////////////////////////////////////////
  .controller("indexCtrl", function ($scope, $rootScope, $location, $window) {
    /*console.log("index ctrl");
    //$window.sessionStorage.setItem("connected", false);
    $rootScope.connected = true;
    console.log( $rootScope.connected);
    if ($rootScope.connected == false) {
      console.log("dans le if");
      $location.url("/signin");
    }*/
  })
  /////////////////////// Sign in controller  /////////////////////////////////////////////////
  .controller('signinCtrl', function ($scope, $rootScope, $location, $window) {
   /* $scope.checkUser = function () {
      if ($scope.login == "user" && $scope.pass == "pass") {
        //$window.sessionStorage.setItem("connected", true);
        $rootScope.connected=true;
        console.log( $rootScope.connected);
        $location.url("/accueil");
      }
    }*/
  })
  /////////////////////// Accueil controller //////////////////////////////////////////////////
  .controller('accueilCtrl', function ($scope) {

  })
  /////////////////////// liste controller  ///////////////////////////////////////////////////
.controller('listCtrl',  function ($scope, $routeParams,$location, devisProvider, fournisseursProvider,$mdDialog, commonCode) {

    var param = $routeParams.param; // on récupère la valeur passée dans l'url
    //initialisation des variables
    $scope.displayDevis = false;
    $scope.displayCatalogue = false;
    $scope.displayFournisseur = false;
    $scope.sortReverse = false; // sens du tri par defaut
    /// Gestion de l'icône 
    $scope.setReverseIcon = function () {
      if ($scope.sortReverse == false) {
        $scope.reverseIcon = "ic_keyboard_arrow_down_black_24px"
      } else {
        $scope.reverseIcon = "ic_keyboard_arrow_up_black_24px"
      }
    };
    $scope.setReverseIcon();
    $scope.searchText = ''; // vide le champ de recherche

    switch (param) {
      case "devis":
        $scope.pageTitle = "Liste des devis";
        $scope.sortType = 'num_devis'; // tri sur le num_devis par defaut
        $scope.datas = devisProvider.getDevis();
        $scope.labels = devisProvider.getDevisLabels();
        $scope.displayDevis = true;
        //consulter page devis (id devis en parametre)
        $scope.goToDevis = function ($event) {
          $location.url("/devis/" + $event);
        }

        $scope.deleteDevis = function (numDevis) {
          devisProvider.deleteDevis(devis, numDevis);
        }

        break;
      case "fournisseurs":
        $scope.pageTitle = "Liste des fournisseurs";
        $scope.datas = fournisseursProvider.getFournisseurs();
        $scope.labels = fournisseursProvider.getFournisseursLabels();
        $scope.displayFournisseurs = true;
        break;
      default:
    }

    $scope.deleteSomething = function($event, action) {
        commonCode.showConfirm($event, action);
    }

  })
.controller('catalogueCtrl',  function ($scope, $routeParams, catalogueProvider,$mdDialog, commonCode) {
    $scope.datasGammes = catalogueProvider.getGammes();
    $scope.datasModules = catalogueProvider.getModules();
    $scope.datasComposants = catalogueProvider.getComposants();

    $scope.deleteSomething = function($event, action) {
        commonCode.showConfirm($event, action);
    }
  })
  .controller('compteCtrl', function ($scope, $routeParams, userProvider, $mdDialog) {
    $scope.user = userProvider.getUser();
  })
  .controller('editDevisCtrl', function ($scope, $routeParams, devisProvider, userProvider, catalogueProvider, $mdDialog) {
    //Récupération des données
    $scope.devisData = devisProvider.getaDevis();
    $scope.clientData = userProvider.getClient();
    $scope.comData = userProvider.getUser();
    $scope.gammes = catalogueProvider.getGammes();
    $scope.modules = catalogueProvider.getModules();
    $scope.composants = catalogueProvider.getComposants();

    // initialisation des choix
    $scope.choixCatalogue = [];
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
    $scope.getMatchComposant = function (inputId, inputIdComposant) {
      var resultMatchComposant = false;
      for (var i = 0; i < inputIdComposant.length; i++) {
        if (inputIdComposant[i] == inputId) {
          resultMatchComposant = true
        }
      }
      return resultMatchComposant;
    }
  })
