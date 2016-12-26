'use strict';

/* Controllers */

app
/////////////////////// tabs controller  ///////////////////////////////////////////////////
//Pour rediriger vers les bonnes routes
.controller('tabCtrl', function($scope, $location, $log) {
        $scope.selectedIndex = 0;
        $scope.$watch('selectedIndex', function(current, old) {
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
        $scope.showProfile = function(event) {
          $location.url("/compte");
          // TO DO ajouter en parametre identifiant user
        };
    })
/////////////////////// liste controller  ///////////////////////////////////////////////////
.controller('listCtrl',  function ($scope, $routeParams,$location, devisProvider, fournisseursProvider,$mdDialog) {

  var param=$routeParams.param; // on récupère la valeur passée dans l'url
  //initialisation des variables
  $scope.displayDevis=false;
  $scope.displayCatalogue=false;
  $scope.displayFournisseur=false;
  $scope.sortReverse = false; // sens du tri par defaut
  /// Gestion de l'icône d
  $scope.setReverseIcon = function (){
    if ( $scope.sortReverse == false) {
      $scope.reverseIcon ="ic_keyboard_arrow_down_black_24px"
      console.log("false "+$scope.reverseIcon);
    }else {
      $scope.reverseIcon ="ic_keyboard_arrow_up_black_24px"
      console.log("true "+$scope.reverseIcon);
    }
  };
  $scope.setReverseIcon();
  $scope.searchText = ''; // vide le champ de recherche
  // Test pour récupérer les données correspondant au paramètre envoyé
  $scope.getSelectedText = function() {
    if ($scope.sortType !== undefined) {
      console.log("You have selected: Item " + $scope.sortType);
    } else {
      console.log("Please select an item");
    }
  };
  switch (param) {
    case "devis":
      $scope.pageTitle ="Liste des devis";
      $scope.sortType = 'num_devis'; // tri sur le num_devis par defaut
      $scope.datas = devisProvider.getDevis();
      $scope.labels=devisProvider.getDevisLabels();
      $scope.displayDevis=true;
      $scope.goToDevis=function($event) {
        console.log("/devis/"+$event);
        $location.url("/devis/"+$event);
      }
      break;
    case "fournisseurs":
      $scope.pageTitle ="Liste des fournisseurs";
      $scope.datas = fournisseursProvider.getFournisseurs();
      $scope.labels=fournisseursProvider.getFournisseursLabels();
      $scope.displayFournisseurs=true;
    break;
    default:
  }
  $scope.showConfirm = function($event) {
      var confirm = $mdDialog.confirm()
         .title('Etes-vous sur de vouloir supprimer cet élément?')
         .ariaLabel('TutorialsPoint.com')
         .targetEvent(event)
         .ok('Oui')
         .cancel('Non');
         $mdDialog.show(confirm).then(function() {
            $scope.status = 'Record deleted successfully!';
            }, function() {
               $scope.status = 'You decided to keep your record.';
         });
   };
})
.controller('catalogueCtrl',  function ($scope, $routeParams, catalogueProvider,$mdDialog) {
  $scope.datasGammes = catalogueProvider.getGammes();
  $scope.datasModules = catalogueProvider.getModules();
  $scope.datasComposants = catalogueProvider.getComposants();

  $scope.showConfirm = function(event) {
      var confirm = $mdDialog.confirm()
         .title('Etes-vous sur de vouloir supprimer cet élément?')
         .ariaLabel('TutorialsPoint.com')
         .targetEvent(event)
         .ok('Oui')
         .cancel('Non');
         $mdDialog.show(confirm).then(function() {
            $scope.status = 'Record deleted successfully!';
            }, function() {
               $scope.status = 'You decided to keep your record.';
         });
   };

})
.controller('compteCtrl',  function ($scope, $routeParams, userProvider,$mdDialog) {
  $scope.user=userProvider.getUser();
})
.controller('editDevisCtrl', function ($scope, $routeParams, devisProvider,$mdDialog) {
  $scope.datas=devisProvider.getaDevis();
})
