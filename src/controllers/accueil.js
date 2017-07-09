  /////////////////////// Accueil controller //////////////////////////////////////////////////
  app.controller('accueilCtrl', function($window, $scope, authentification, $location, $rootScope) {
      $scope.authentification = authentification.validate('');

      if ($window.sessionStorage.getItem('login') != null) {
          $scope.login = $window.sessionStorage.getItem('prenom') + " " + $window.sessionStorage.getItem('nom');
      }

      if ($window.sessionStorage.getItem('showNav') != null) {
          $rootScope.showNav = true;
      } else {
          $rootScope.showNav = false;
      }
  })