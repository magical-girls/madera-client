'use strict';
var user=
  {
    "id":"1",
    "nom":"Simpson",
    "prenom":"Homer",
    "matricule":"12345",
    "telephone":"0296375474",
    "mail":"homer.simpson@gmail.com",
    "pass":"motdepasse"
    }
;
var client=
  {
    "id":"1",
    "nom":"Lionheart",
    "prenom":"Squall",
    "telephone":"0296375474",
    "mail":"squall.lionheart@gmail.com"
  };
app.service('userProvider', function(){
  this.getUser = function(){
    return user;
  }
  this.getClient = function(){
    return client;
  }
})
