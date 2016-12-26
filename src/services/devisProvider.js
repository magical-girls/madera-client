'use strict';
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
  "nom_commercial":"jean",
  "nom_client":"braille",
  "date_creation":"01/01/2016",
  "date_modif":"02/01/2016",
  "etat":"en cours"
},
{
  "id_devis":"2",
  "num_devis":"33",
  "nom_commercial":"Alain",
  "nom_client":"Terrieur",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"terminé"
},
{
  "id_devis":"3",
  "num_devis":"34",
  "nom_commercial":"Agathe",
  "nom_client":"Theblouze",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"validé"
},
{
  "id_devis":"4",
  "num_devis":"48",
  "nom_commercial":"Gérard",
  "nom_client":"Menvussa",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"en attente"
},
{
  "id_devis":"5",
  "num_devis":"65",
  "nom_commercial":"Clara",
  "nom_client":"Binne",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"terminé"
},
{
  "id_devis":"6",
  "num_devis":"16",
  "nom_commercial":"Paul",
  "nom_client":"Aroïde",
  "date_creation":"02/02/2016",
  "date_modif":"03/01/2016",
  "etat":"refusé"
}
];
var aDevis=  [{
  "id_devis":"1",
  "num_devis":"32",
  "nom_commercial":"jean",
  "nom_client":"braille",
  "date_creation":"01/01/2016",
  "date_modif":"02/01/2016",
  "etat":"en cours"
}
];
app.service('devisProvider', function(){
  this.getDevis = function(){
    return devis;
  }
  this.getaDevis = function(){
    return aDevis;
  }
  this.getDevisLabels = function(){
    return devisLabel;
  }
})
