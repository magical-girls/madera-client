'use strict';
var fournisseursLabel=[
  {"name":"Nom du fournisseur",
    "value":"nom_fournisseur"},
  {"name":"Adresse",
    "value":"adresse_fournisseur"},
  {"name":"N° tél",
    "value":"tel_fournisseur"}
];
var fournisseurs=[
  {
  "id_fournisseur":"1",
  "nom_fournisseur":"Méga fragile",
  "adresse_fournisseur":"22 rue pas de gestes brusques",
  "tel_fournisseur":"0101010101",
  "description_fournisseur":"Fournisseur de fenêtres et baies vitrées"
},
{
  "id_fournisseur":"2",
  "nom_fournisseur":"Attention les doigts",
  "adresse_fournisseur":"12 rue des coups involontaires",
  "tel_fournisseur":"0886656565",
  "description_fournisseur":"Outillage: marteaux, pinces, perceuses, etc."
},
{
  "id_fournisseur":"3",
  "nom_fournisseur":"Mites and co",
  "adresse_fournisseur":"16 rue des anciennes forêts",
  "tel_fournisseur":"36303630",
  "description_fournisseur":"Planches de bois (à peine) grignotées "
}];

function getIndexFournisseurFromId(inputFournisseur, inputIdFournisseur){
  var result = null;
  for (var i = 0 ; i < inputFournisseur.length ; i++){
    if (inputIdFournisseur == (inputFournisseur[i].id_Fournisseur)){
      result = i;
    }
  }
  return result;
}

app.service('fournisseursProvider', function(){
  this.getFournisseurs = function(){
    return fournisseurs;
  }
  this.deleteFournisseur = function(inputFournisseur, inputNumFournisseur){
    inputFournisseur.splice(getIndexFournisseurFromId(inputFournisseur, inputNumFournisseur), 1);
  }

  this.getFournisseursLabels = function(){
    return fournisseursLabel;
  }
})
