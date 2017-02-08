app.controller('compteCtrl', function ($scope, $routeParams, userProvider, $mdDialog) {
    $scope.user = userProvider.getUser();
})