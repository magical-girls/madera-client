'use strict';
// pour filtre dans select
var devisLabel=[
  {"name":"N° devis",
    "value":"num_devis"},
  {"name":"Client",
    "value":"nom_client"},
  {"name":"Création",
    "value":"date_creation"},
  {"name":"Dernière modification",
    "value":"date_modif"},
  {"name":"Etat",
    "value":"etat"}
];

var aDevis=  {
  "id_devis":"1",
  "num_devis":"32",
  "nom_commercial":"Homer Simpson",
  "nom_client":"Squall Leonheart",
  "date_creation":"01/01/2016",
  "date_modif":"02/01/2016",
  "etat":"en cours"
};

function getIndexDevisFromId(inputDevis, inputIdDevis){
  var result = null;
  for (var i = 0 ; i < inputDevis.length ; i++){
    if (inputIdDevis == (inputDevis[i].num_devis)){
      result = i;
    }
  }
  return result;
}

app.service('devisProvider', function($http, $window, $routeParams){
  this.getDevis = function(){
	//url get devis
	  return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'devis',
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
  }
  this.deleteDevis = function(inputDevis, inputNumDevis){
    inputDevis.splice(getIndexDevisFromId(inputDevis, inputNumDevis), 1);
  }

  this.getaDevis = function(id){
	//url get devis
	  return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'devis',
				  params : {
					  'id' : id
				  },
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
  }
  this.getDevisLabels = function(){
    return devisLabel;
  }
})
