 ///////////////////// Edit catalogue controller /////////////////////////
 app.controller('editCatalogueCtrl', function($scope, $routeParams, devisProvider, $rootScope, fournisseursProvider,
     catalogueProvider, $mdDialog, $window, $location, authentification, commonCode) {
     $scope.authentification = authentification.validate('');
     if (!$scope.authentification) {
         $location.url("/signin");
     }
     if ($window.sessionStorage.getItem('showNav') != null) {
         $rootScope.showNav = true;
     } else {
         $rootScope.showNav = false;
     }
     $scope.type = $routeParams.type;
     $scope.id = $routeParams.id;
     $scope.edit = $routeParams.edit;



     catalogueProvider.getGammeById($routeParams.id).async().then(function(response) {
         $scope.nom = response.data.nom;
         $scope.commentaire = response.data.commentaire;
     }, function(error) {
         commonCode.alertErreur();
     });


     catalogueProvider.getModuleById($routeParams.id).async().then(function(response) {
         $scope.nom = response.data.idReference;
         $scope.commentaire = response.data.commentaire;
         $scope.gammes = response.data.idGamme;
     }, function(error) {
         commonCode.alertErreur();
     });

     catalogueProvider.getComposantById($routeParams.id).async().then(function(response) {
         $scope.nom = response.data.nom;
         $scope.commentaire = response.data.commentaire;
         $scope.prix = response.data.prixHT;
         $scope.modules = response.data.idModule;
     }, function(error) {
         commonCode.alertErreur();
     });

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
     $scope.returnFunction = function() {
         $window.history.back();
     };
 })