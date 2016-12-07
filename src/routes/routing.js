'use strict';

app.config(['$routeProvider',
function ($routeProvider) {
  $routeProvider
  .when('/index', {
    templateUrl: 'index.html',
    controller: 'connectCtrl'
  })
  .when('/accueil', {
    templateUrl: 'views/accueil.html',
    controller: 'accueilCtrl'
  })
  .when('/liste/:param', {
    templateUrl: 'views/liste.html',
    controller: 'listCtrl'
  })
  .when('/edit_devis', {
    templateUrl: 'views/devis.html',
    controller: 'formCtrl'
  })
  .when('/compte', {
    templateUrl: 'views/compte.html',
    controller: 'compteCtrl'
  })
  .otherwise({
    redirectTo: '/liste/devis'
  });
}
])
