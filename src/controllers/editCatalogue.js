 ///////////////////// Edit catalogue controller /////////////////////////
app .controller('editCatalogueCtrl', function ($scope, $routeParams, devisProvider, fournisseursProvider, catalogueProvider, $mdDialog, $window) {
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