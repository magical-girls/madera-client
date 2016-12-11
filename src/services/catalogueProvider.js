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
]
app.service('catalogueProvider', function(){
  this.getGammes = function(){
    return gammes;
  }
  this.getModules = function(){
    return modules;
  }
  this.getComposants = function(){
    return composants;
  }
})