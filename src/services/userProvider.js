'use strict';
var user=[
  {
    "id":"1",
    "nom":"Simpson",
    "prenom":"Homer",
    "matricule":"12345",
    "telephone":"0296375474",
    "mail":"homer.simpson@gmail.com",
    "pass":"motdepasse"
    }
];
app.service('userProvider', function(){
  this.getFournisseurs = function(){
    return user;
  }
})
