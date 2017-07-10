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
     catalogueProvider.getGammes().async().then(function(response) {
         $scope.datasGammes = response.data;
         //recupération des modules
         $scope.datasModules = catalogueProvider.getModules().async().then(function(response) {
                 $scope.datasModules = response.data;
                 // Récupération des composants
                 $scope.datasComposants = catalogueProvider.getComposants().async().then(function(response) {
                         $scope.datasComposants = response.data;
                         //echec composants
                     }, function(error) {
                         commonCode.alertErreur();
                     })
                     //Echec modules
             }, function(error) {
                 commonCode.alertErreur();
             })
             //Echec gammes
     }, function(error) {
         commonCode.alertErreur();
     });
     // si edit, récupérer les infos correspondantes à l'id
     switch ($scope.type) {
         case "gamme":
             $scope.title = "Gamme";
             catalogueProvider.getGammeById($routeParams.id).async().then(function(response) {
                 $scope.nom = response.data.nom;
                 $scope.commentaire = response.data.commentaire;
             }, function(error) {
                 commonCode.alertErreur();
             });
             break;
         case "module":
             $scope.title = "Module";
             catalogueProvider.getModuleById($routeParams.id).async().then(function(response) {
                 $scope.nom = response.data.commentaire;
                 // $scope.commentaire = response.data.commentaire;
                 console.log('gamme id = ' + response.data.idGamme);
                 $scope.gammes = $scope.getGammeName(response.data.idGamme);
             }, function(error) {
                 commonCode.alertErreur();
             });

             break;
         case "composant":
             $scope.title = "Composant";
             catalogueProvider.getComposantById($routeParams.id).async().then(function(response) {
                 $scope.nom = response.data.nom;
                 $scope.commentaire = response.data.commentaire;
                 $scope.prix = response.data.prixHT;
                 //$scope.modules = $scope.getModuleName(response.data.idModule);
             }, function(error) {
                 commonCode.alertErreur();
             });
             break;
         default:
             break;
     }


     $scope.returnFunction = function() {
         $window.history.back();
     };
     // Récupérer le nom des gammes de chacun des modules
     $scope.getGammeName = function(id) {
         $scope.gammeName = "";
         for (var i = 0; i < id.length; i++) {
             for (var j = 0; j < $scope.datasGammes.length; j++) {
                 if ($scope.datasGammes[j].idReference == id[i]) {
                     if ($scope.gammeName != "") {
                         $scope.gammeName += ", ";
                     }
                     $scope.gammeName += $scope.datasGammes[j].nom;
                 }
             }
         }
         return $scope.gammeName;
     }

     // Récupérer le nom des modules de chacun des composants
     $scope.getModuleName = function(id) {
         $scope.moduleName = "";
         for (var i = 0; i < id.length; i++) {
             for (var j = 0; j < $scope.datasModules.length; j++) {
                 if ($scope.datasModules[j].idReference == id[i]) {

                     if ($scope.moduleName != "") {
                         $scope.moduleName += ", ";
                     }
                     $scope.moduleName += $scope.datasModules[j].commentaire;
                 }
             }
         }
         return $scope.moduleName;
     }

 })