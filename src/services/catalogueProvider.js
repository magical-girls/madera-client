'use strict';
var gammes=[
  {
      "id_gamme": "g1",
      "nom_gamme": "gamme 1",
      "description_gamme": "lorem ipsum"
  },
  {
      "id_gamme": "g2",
      "nom_gamme": "gamme 2",
      "description_gamme": "lorem ipsum"
  },
  {
      "id_gamme": "g3",
      "nom_gamme": "gamme 3",
      "description_gamme": "lorem ipsum"
  }
];
var modules=[
  {
      "id_module": "m1",
      "nom_module": "module 1",
      "description_module": "lorem ipsum",
      "_id_gamme": [
          "g1"
      ]
  },
  {
      "id_module": "m2",
      "nom_module": "module 2",
      "description_module": "lorem ipsum",
      "_id_gamme": [
          "g3"
      ]
  },
  {
      "id_module": "m3",
      "nom_module": "module 3",
      "description_module": "lorem ipsum",
      "_id_gamme": [
          "g2",
          "g3"
      ]
  }
];
var composants= [
    {
        "id_composant": "c1",
        "nom_composant": "composant 1",
        "description_composant": "lorem ipsum",
        "prix_composant_ht_euros" : "100",
        "_id_module": [
            "m1"
        ]
    },
    {
        "id_composant": "c2",
        "nom_composant": "composant 2",
        "description_composant": "lorem ipsum",
        "prix_composant_ht_euros" : "200",
        "_id_module": [
            "m1"
        ]
    },
    {
        "id_composant": "c4",
        "nom_composant": "composant 4",
        "description_composant": "lorem ipsum",
        "prix_composant_ht_euros" : "400",
        "_id_module": [
            "m2"
        ]
    },
    {
        "id_composant": "c3",
        "nom_composant": "composant 3",
        "description_composant": "lorem ipsum",
        "prix_composant_ht_euros" : "300",
        "_id_module": [
            "m1",
            "m2",
            "m3"
        ]
    }
];

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

app.service('catalogueProvider', function(){
  this.getGammes = function(){
    return gammes;
  }
  this.deleteGamme = function(inputGamme, inputNumGamme){
    inputGamme.splice(getIndexGammeFromId(inputGamme, inputNumGamme), 1);
  }

  this.getModules = function(){
    return modules;
  }
  this.deleteModule = function(inputModule, inputNumModule){
    inputModule.splice(getIndexModuleFromId(inputModule, inputNumModule), 1);
  }

  this.getComposants = function(){
    return composants;
  }
  this.deleteComposant = function(inputComposant, inputNumComposant){
    console.log(inputComposant);
    console.log("debugfromcatalogueprovider : " + inputNumComposant);
    inputComposant.splice(getIndexComposantFromId(inputComposant, inputNumComposant), 1);
  }
})
