'use strict';

/* Controllers */

app
/////////////////////// tabs controller  ///////////////////////////////////////////////////

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
                    $location.url("/liste/catalogue");
                    break;
                case 3:
                    $location.url("/liste/fournisseurs");
                    break;
            }
        });
    })
/////////////////////// liste controller  ///////////////////////////////////////////////////
.controller('listCtrl',  function ($scope, $routeParams, devisProvider, fournisseursProvider,$mdDialog) {
  console.log("heyo!");
  var param=$routeParams.param; // on récupère la valeur passée dans l'url
  $scope.displayDevis=false;
  $scope.displayCatalogue=false;
  $scope.displayFournisseur=false;
  $scope.sortReverse = false; // sens du tri par defaut
  $scope.setReverseIcon = function (){
    if ( $scope.sortReverse == false) {
      $scope.reverseIcon ="keyboard_arrow_down"
      console.log("false "+$scope.reverseIcon);
    }else {
      $scope.reverseIcon ="keyboard_arrow_up"
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

      /*$scope.getAvancementColor = function (input) {
        if (input == "refusé") {
          return "bold redFont";
        }
        else if (input == "terminé") {
          return "bold greenFont";
        }
      }*/
    break;
    case "catalogue":
      $scope.pageTitle ="Catalogue";

      $scope.displayCatalogue=true;
    break;
    case "fournisseurs":
      $scope.pageTitle ="Liste des fournisseurs";
      $scope.datas = fournisseursProvider.getFournisseurs();
      $scope.labels=fournisseursProvider.getFournisseursLabels();
      $scope.displayFournisseur=true;
    break;
    default:
  }
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
