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
  .controller('listCtrl', function ($scope, $routeParams, $location, devisProvider, fournisseursProvider, $mdDialog, commonCode) {

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
        $scope.goToDevis = function ($id, $edit) {
          $location.url("/devis/" + $id + "/" + $edit);
        }

        $scope.addNewDevis = function () {
          $location.url("/devis/new/" + true);
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

        $scope.goToFournisseur = function ($id, $edit) {
          $location.url("/fournisseur/" + $id + "/" + $edit);
        }

        $scope.addNewFournisseur = function () {
          $location.url("/fournisseur/new/" + true);
        }
        break;
      default:
    }

    $scope.deleteSomething = function ($event, action) {
      commonCode.showConfirm($event, action);
    }
  })
  .controller('catalogueCtrl', function ($scope, $routeParams, catalogueProvider, $mdDialog, commonCode, $location) {
    $scope.datasGammes = catalogueProvider.getGammes();
    $scope.datasModules = catalogueProvider.getModules();
    $scope.datasComposants = catalogueProvider.getComposants();

    $scope.deleteSomething = function ($event, action) {
      commonCode.showConfirm($event, action);
    }
    /// FAB 
    $scope.addToCatalogue = function ($type) {
      $location.url("/editCatalogue/true/" + $type + "/" + "new");
    }
    $scope.editCatalogue = function ($type, $id, $edit) {
      $location.url("/editCatalogue/" + $edit + "/" + $type + "/" + $id);
    }
  })
  .controller('compteCtrl', function ($scope, $routeParams, userProvider, $mdDialog) {
    $scope.user = userProvider.getUser();
  })
  .controller('editDevisCtrl', function ($scope, $routeParams, devisProvider, userProvider, catalogueProvider, $mdDialog, $window) {
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
    // Bouton retour
    $scope.returnFunction = function () {
      $window.history.back();
    };
  })
  .controller('editCatalogueCtrl', function ($scope, $routeParams, devisProvider, fournisseursProvider, catalogueProvider, $mdDialog, $window) {
    $scope.type = $routeParams.type;
    $scope.id = $routeParams.id;
    $scope.edit = $routeParams.edit;
    $scope.gammes = catalogueProvider.getGammes();
    $scope.modules = catalogueProvider.getModules();
    $scope.fournisseurs = fournisseursProvider.getFournisseurs();
    // si edit, récupérer les infos correspondantes à l'id
    switch ($scope.type) {
      case "gamme":
        $scope.title = "Gamme";
        break;
      case "module":
        $scope.title = "Module";

        break;
      case "composant":
        $scope.title = "Composant";

        break;
      default:
        break;
    }
    $scope.returnFunction = function () {
      $window.history.back();
    };
  })
  .controller('editFournisseurCtrl', function ($scope, $routeParams, fournisseursProvider, catalogueProvider, $mdDialog, $window) {
    $scope.edit = $routeParams.edit;
    var id = $routeParams.id;

    $scope.gammes = catalogueProvider.getGammes();
    $scope.modules = catalogueProvider.getModules();
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
      ///////todo : mettre dans le code commun
       $scope.getMatchModule = function (inputId, inputIdGamme) {
         console.log("match module");
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
      $scope.choixCatalogue.splice(index, 1);
    };
    $scope.returnFunction = function () {
      $window.history.back();
    };
  });