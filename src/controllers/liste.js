  /////////////////////// Lists controller  /////////////////////////////////////////////////
app.controller('listCtrl', function ($scope, $routeParams, $location, devisProvider, 
		fournisseursProvider, $mdDialog, commonCode, authentification) {
	
	$scope.authentification = authentification.validate('');
    if(!$scope.authentification){
    	$location.url("/signin");
    }

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