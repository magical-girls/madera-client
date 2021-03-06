  /////////////////////// Lists controller  /////////////////////////////////////////////////
  app.controller('listCtrl', function($scope, $window, $routeParams, $location, $rootScope, devisProvider,
      fournisseursProvider, $mdDialog, commonCode, authentification) {

      $scope.authentification = authentification.validate('');
      if (!$scope.authentification) {
          $location.url("/signin");
      }
      if ($window.sessionStorage.getItem('showNav') != null) {
          $rootScope.showNav = true;
      } else {
          $rootScope.showNav = false;
      }
      var param = $routeParams.param; // on récupère la valeur passée dans l'url
      //initialisation des variables
      $scope.displayDevis = false;
      $scope.displayCatalogue = false;
      $scope.displayFournisseur = false;
      $scope.sortReverse = false; // sens du tri par defaut
      /// Gestion de l'icône 
      $scope.setReverseIcon = function() {
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

              devisProvider.getDevis().async().then(function(response) {
                  $scope.datas = response.data;
              }, function(error) {
                  commonCode.alertErreur();
              });

              $scope.labels = devisProvider.getDevisLabels();
              $scope.displayDevis = true;
              //consulter page devis (id devis en parametre)
              $scope.goToDevis = function($id, $edit) {
                  $location.url("/devis/" + $id + "/" + $edit);
              }

              $scope.addNewDevis = function() {
                  $location.url("/devis/new/" + true);
              }

              $scope.deleteDevis = function(numDevis) {
                  devisProvider.deleteDevis(devis, numDevis);
              }

              break;
          case "fournisseurs":
              $scope.pageTitle = "Liste des fournisseurs";
              $scope.fournisseurs = fournisseursProvider.getFournisseurs().async().then(function(response) {
                  $scope.dataFournisseurs = response.data;
              }, function(error) {
                  commonCode.alertErreur();
              })
              $scope.labels = fournisseursProvider.getFournisseursLabels();
              $scope.displayFournisseurs = true;

              $scope.goToFournisseur = function($id, $edit) {
                  $location.url("/fournisseur/" + $id + "/" + $edit);
              }

              $scope.addNewFournisseur = function() {
                  commonCode.showForbidden()
                      //$location.url("/fournisseur/new/" + true);
              }
              break;
          default:
      }
      $scope.editFournisseur = function() {
          commonCode.showForbidden();
      }

      $scope.deleteSomething = function($event, action) {
          commonCode.showConfirmDel($event, action);
      }
  })