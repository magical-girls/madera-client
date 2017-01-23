'use strict';

app.config(['$routeProvider',
function ($routeProvider) {
  $routeProvider
  .when('/index', {
    templateUrl: 'index.html',
    controller: 'indexCtrl'
  })
  .when('/accueil', {
    templateUrl: 'views/accueil.html',
    controller: 'accueilCtrl'
  })
  .when('/liste/:param', {
    templateUrl: 'views/liste.html',
    controller: 'listCtrl'
  })
  .when('/catalogue', {
    templateUrl: 'views/catalogue.html',
    controller: 'catalogueCtrl'
  })
  .when('/editCatalogue/:action/:type/:param', {
    templateUrl: 'views/editCatalogue.html',
    controller: 'editCatalogueCtrl'
  })
  .when('/compte', {
    templateUrl: 'views/compte.html',
    controller: 'compteCtrl'
  })
  .when('/devis/:id/:edit', {
    templateUrl: 'views/devis.html',
    controller: 'editDevisCtrl'
  })
  .when('/signin', {
    templateUrl: 'views/signin.html',
    controller: 'signinCtrl'
  });
}])
