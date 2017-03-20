'use strict';


function getIndexGammeFromId(inputGamme, inputIdGamme){
  var result = null;
  for (var i = 0 ; i < inputGamme.length ; i++){
    if (inputIdGamme == (inputGamme[i].id_gamme)){
      result = i;
    }
  }
  return result;
}

function getIndexModuleFromId(inputModule, inputIdModule){
  var result = null;
  for (var i = 0 ; i < inputModule.length ; i++){
    if (inputIdModule == (inputModule[i].id_module)){
      result = i;
    }
  }
  return result;
}

function getIndexComposantFromId(inputComposant, inputIdComposant){
  var result = null;
  for (var i = 0 ; i < inputComposant.length ; i++){
    if (inputIdComposant == (inputComposant[i].id_composant)){
      result = i;
    }
  }
  return result;
}

app.service('catalogueProvider', function($http, $window){
  this.getGammes = function(){
	  
	  //url get gamme
	  return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'gamme',
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
  }
  this.getGammeById = function(id){
	  return {
		  async : function(){
			  return $http({
				  method : 'GET',
				  url : host + 'gamme',
				  params : {
					  'id' : id
				  },
				  headers : {
					'token' : $window.sessionStorage.getItem('token'),
				  	'Content-type' : 'application/json; charset=UTF-8'
				  }
			  })
		  }
	  }
  }
  this.deleteGamme = function(inputGamme, inputNumGamme){
    inputGamme.splice(getIndexGammeFromId(inputGamme, inputNumGamme), 1);
  }

  this.getModules = function(){
	  
	  //url get gamme
	  return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'module',
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
  }
  
  this.getModuleById = function(id){
	  return {
	  async : function(){
		  return $http({
			  method : 'GET',
			  url : host + 'module',
			  params : {
				  'id' : id
			  },
			  headers : {
				'token' : $window.sessionStorage.getItem('token'),
			  	'Content-type' : 'application/json; charset=UTF-8'
			  }
		  })
	  	}
	  }
  }
  
  this.deleteModule = function(inputModule, inputNumModule){
    inputModule.splice(getIndexModuleFromId(inputModule, inputNumModule), 1);
  }

  this.getComposants = function(){
	  
	  //url get gamme
	  return  {
		    async: function() {
		    	return $http({
				  method : 'GET',
				  url : host + 'composant',
			  	  headers : {
			  		'token' : $window.sessionStorage.getItem('token'),
			  		'Content-type' : 'application/json; charset=UTF-8'
			  	   }
				  });
				 } 
		 }
  }
  
  this.getComposantById = function(id){
	  return {
		  async : function(){
			  return $http({
				  method : 'GET',
				  url : host + 'composant',
				  params : {
					  'id' : id
				  },
				  headers : {
					'token' : $window.sessionStorage.getItem('token'),
				  	'Content-type' : 'application/json; charset=UTF-8'
				  }
			  })
		  	}
		  }
	  }
  this.deleteComposant = function(inputComposant, inputNumComposant){
    console.log(inputComposant);
    console.log("debugfromcatalogueprovider : " + inputNumComposant);
    inputComposant.splice(getIndexComposantFromId(inputComposant, inputNumComposant), 1);
  }
})
