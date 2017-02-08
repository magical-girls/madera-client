/////////////////////// Lists controller  /////////////////////////////////////////////////
app.controller('catalogueCtrl', function ($scope, $routeParams, catalogueProvider, $mdDialog, commonCode, $location) {
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
