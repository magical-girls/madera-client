'use strict';
// pour filtre dans select
var devisLabel=[
  {"name":"N° devis",
    "value":"num_devis"},
  {"name":"Commercial",
    "value":"nom_commercial"},
  {"name":"Client",
    "value":"nom_client"},
  {"name":"Création",
    "value":"date_creation"},
  {"name":"Dernière modification",
    "value":"date_modif"},
  {"name":"Etat",
    "value":"etat"}
];
var devis=  [{
  "id_devis":"1",
  "num_devis":"32",
  "nom_commercial":"jean braille",
  "nom_client":"Alban Tourloupe",
  "date_creation":"01/01/2016",
  "date_modif":"02/01/2016",
  "etat":"en cours"
},
{
  "id_devis":"2",
  "num_devis":"33",
  "nom_commercial":"Alain Terrieur",
  "nom_client":"Rudy LeRenne",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"terminé"
},
{
  "id_devis":"3",
  "num_devis":"34",
  "nom_commercial":"Agathe Theblouze",
  "nom_client":"Cathy Penflamme",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"validé"
},
{
  "id_devis":"4",
  "num_devis":"48",
  "nom_commercial":"Gérard Menvussa",
  "nom_client":"Alphy Celle",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"en attente"
},
{
  "id_devis":"5",
  "num_devis":"65",
  "nom_commercial":"Clara Binne",
  "nom_client":"Papyrus",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"terminé"
},
{
  "id_devis":"6",
  "num_devis":"16",
  "nom_commercial":"Gérard Menvussa",
  "nom_client":"Paul Aroïde",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"refusé"
}
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
