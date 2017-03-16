'use strict';

var client=
  {
    "id":"1",
    "nom":"Lionheart",
    "prenom":"Squall",
    "telephone":"0296375474",
    "mail":"squall.lionheart@gmail.com"
  };
app.service('userProvider', function($http, $window){
  this.getUser = function(){
	 return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'user',
				  params : {
					  'id' : $window.sessionStorage.getItem('matricule')
				  },
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
	 }
  this.getClient = function(){
    return client;
  }
})
