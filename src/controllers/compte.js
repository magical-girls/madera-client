app.controller('compteCtrl', function($scope, $routeParams, $rootScope, userProvider, $mdDialog, $window, authentification) {
    $scope.authentification = authentification.validate('');
    if (!$scope.authentification) {
        $location.url("/signin");
    }
    if ($window.sessionStorage.getItem('showNav') != null) {
        $rootScope.showNav = true;
    } else {
        $rootScope.showNav = false;
    }
    userProvider.getUser().async().then(function(response) {
        $scope.user = response.data;
    }, function(error) {
        alert('Erreur de connexion');
    });
})