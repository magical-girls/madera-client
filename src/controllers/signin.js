/////////////////////// Sign in controller  /////////////////////////////////////////////////
app.controller('signinCtrl', function($scope, $route, $rootScope, $location, $window, authentification, commonCode) {
    $scope.setToken = function() {
        if (!angular.isUndefined($scope.login) || !angular.isUndefined($scope.pass)) {
            //  console.log( await authentification.setToken($scope.login, $scope.pass));
            authentification.setToken($scope.login, $scope.pass);
            setTimeout(function() {
                console.log("check = " + $rootScope.check);
                if ($rootScope.check) {
                    $location.url("/accueil");
                    $route.reload();
                    $rootScope.showNav = true;
                    console.log("connection succeed");
                } else {
                    //$rootScope.showNav = false;
                    // normalement failed et rester sur sign in
                    console.log("connection failed");
                }
            }, 500);

        } else {

        }
    };
})