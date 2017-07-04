/////////////////////// tabs controller  ///////////////////////////////////////////////////
//Pour rediriger vers les bonnes routes

app.controller('tabCtrl', function($scope, $rootScope, $location, $log, authentification, $window) {
    // authentificationReadInHeader
    $scope.$watch(function() {
        return authentification.validate()
    }, function() {
        $scope.authentification = authentification.validate();
        console.log($scope.authentification);
    });

    //$scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old) {

        if ($scope.authentification == false) {
            $location.url("/signin");
        } else {
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
        }
    });

    //    $scope.setToken = function () {
    //        authentification.setToken();
    //        $scope.readToken = authentification.readToken();
    //    };

    $scope.deleteToken = function() {
        console.log("delete");
        authentification.deleteToken();
        $scope.readToken = authentification.readToken();
        $rootScope.showNav = false;
        $location.url("/signin");
    };
    $scope.showProfile = function(event) {
        $location.url("/compte");
        // TO DO ajouter en parametre identifiant user 
    };
})