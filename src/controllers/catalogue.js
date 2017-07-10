/////////////////////// Lists controller  /////////////////////////////////////////////////
app.controller('catalogueCtrl', function($window, $scope, $routeParams, catalogueProvider, $rootScope, $mdDialog, commonCode, $location, authentification) {
    $scope.authentification = authentification.validate('');
    if (!$scope.authentification) {
        $location.url("/signin");
    }
    if ($window.sessionStorage.getItem('showNav') != null) {
        $rootScope.showNav = true;
    } else {
        $rootScope.showNav = false;
    }
    $scope.edit = $routeParams.edit;

    catalogueProvider.getGammes().async().then(function(response) {
        $scope.datasGammes = response.data;
        $routeParams.gammes = response.data;
        //recupération des modules
        $scope.datasModules = catalogueProvider.getModules().async().then(function(response) {
                $scope.datasModules = response.data;
                $routeParams.modules = response.data;
                // Récupération des composants
                $scope.datasComposants = catalogueProvider.getComposants().async().then(function(response) {
                        $scope.datasComposants = response.data;
                        $routeParams.composants = response.data;
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

    $scope.deleteSomething = function($event, action) {
            if ($routeParams.edit) {
                commonCode.showConfirmDel($event, action);
            } else {
                commonCode.showForbidden();
            }
        }
        /// FAB 
    $scope.addToCatalogue = function($type) {
        if ($routeParams.edit) {
            $location.url("/editCatalogue/true/" + $type + "/" + "new");
        } else {
            commonCode.showForbidden();
        }
    }
    $scope.editCatalogue = function($type, $id, $edit) {
        if ($edit == false) {
            $location.url("/editCatalogue/" + $edit + "/" + $type + "/" + $id);
        } else {
            commonCode.showForbidden();
        }
    }

})