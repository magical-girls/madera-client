///////////////////// Edit devis controller /////////////////////////
app.controller('editDevisCtrl', function ($scope, $routeParams, devisProvider, userProvider,
  catalogueProvider, $mdDialog, $window, $location, authentification, commonCode, $interval) {
  $scope.authentification = authentification.validate('');
  if (!$scope.authentification) {
    $location.url("/signin");
  }
  // Vérification du mode edition (activé ou non)
  $scope.choixCatalogue = [];
  $scope.edit = $routeParams.edit;
  var id = $routeParams.id;
  var prixToutComposantHT = 0;
  $scope.addClientComment = false;
  $scope.addCommercialComment = false;
  $scope.gammeIsDefined = false;
  $scope.prixHT = 0;
  $scope.disable = true;
  // Création des tableaux pour le post
  $scope.sectionJson = [];
  $scope.angleJson = [];
  $scope.moduleJson = [];
  userProvider.getUser().async().then(function (response) {
    $scope.user = response.data;
  }, function (error) {
    alert('Erreur de connexion');
  });

  //si on edit, récupération des données du devis
  if ("new" != id) {
    console.log("id n'est pas new :" + id);
    $scope.new = false;
    devisProvider.getaDevis(id).async().then(function (response) {
      //récupération données utilisateur

      $scope.devisData = response.data;
      $scope.gammes = response.data.gamme;
      if ($scope.gammes.length != 0) {
        $scope.gammeIsDefined = true;
        $scope.selectedGammeId = $scope.gammes.idReference;
      }

      $scope.modules = response.data.lstModule;
      $scope.composants = response.data.lstComposant;

      for (var i = 0; i < $scope.modules.length; i++) {
        $scope.moduleJson.push($scope.modules[i]);
      }
      for (var i = 0; i < $scope.devisData.lstSection.length; i++) {
        $scope.sectionJson.push($scope.devisData.lstSection[i]);
      }
      for (var i = 0; i < $scope.devisData.lstAngle.length; i++) {
        $scope.angleJson.push($scope.devisData.lstAngle[i]);
      }


      // Prix du devis
      for (var i = 0; i < $scope.composants.length; i++) {
        prixToutComposantHT += $scope.composants[i].prixHT;
        $scope.prixHT = prixToutComposantHT;
      }
      $scope.prixTTC = $scope.prixHT * 1.2;
      // Création du tableau listant le contenu du devis
      if ($scope.modules.length != 0) {
        for (var i = 0; i < $scope.modules.length; i++) {
          if ($scope.devisData.lstSection.length != 0) {
            for (var j = 0; j < $scope.devisData.lstSection.length; j++) {
              if ($scope.devisData.lstAngle.length != 0) { }
              for (var k = 0; k < $scope.devisData.lstAngle.length; k++) {
                if (($scope.devisData.lstAngle[k].moduleA == $scope.devisData.lstSection[j].refModule)
                  || ($scope.devisData.lstAngle[k].moduleB == $scope.devisData.lstSection[j].refModule)) {
                  $scope.choixCatalogue.push({
                    'id_row': new Date().getTime(),
                    'nom_gamme': $scope.gammes.nom,
                    'nom_module': $scope.modules[i].commentaire,
                    'num_section': j + 1,
                    'longueur': $scope.devisData.lstSection[j].longueur,
                    'type': $scope.devisData.lstAngle[k].type,
                    'degre': $scope.devisData.lstAngle[k].degre
                  });
                }
              }
            }
          }
        }
      }
    }, function (error) {
      commonCode.alertErreur();
    });

  } else {
    console.log("id est new: " + id);
    $scope.new = true;
    $scope.comData = userProvider.getUser();
  }
  // Listes déroulantes - catalogueProvider    
  catalogueProvider.getGammes().async().then(function (response) {
    $scope.datasGammes = response.data;
  }, function (error) {
    commonCode.alertErreur();
  })

  catalogueProvider.getModules().async().then(function (response) {
    $scope.datasModules = response.data;
  }, function (error) {
    commonCode.alertErreur();
  })

  //Gestion des commentaires
  $scope.clientComment = [];
  $scope.commercialComment = [];
  $scope.addComment = function (txt, target) {
    if (target == 'client') {
      $scope.clientComment.push({ 'id_row': new Date().getTime(), 'comment_txt': txt, 'comment_date': new Date().getTime() });
      $scope.clientCommentary = null;
      $scope.addClientComment = false;
    } else {
      $scope.commercialComment.push({ 'id_row': new Date().getTime(), 'comment_txt': txt, 'comment_date': new Date().getTime() });
      $scope.commercialCommentary = null;
      $scope.addCommercialComment = false;
    }
  };

  $scope.add = function (inputNomGamme, inputNomModule, inputLongueur, inputAngle, inputDegre) {

    $scope.addChoixCatalogueRow(inputNomGamme, inputNomModule, inputLongueur, inputAngle, inputDegre);
    $scope.addModuleJson(inputNomModule);
    $scope.addSectionJson(inputNomModule, inputLongueur);
    $scope.addAngleJson(inputNomModule, inputAngle, inputDegre);
    $scope.updatePrices();

  }
  // ajout des nouveaux choix pour affichage
  $scope.addChoixCatalogueRow = function (inputNomGamme, inputNomModule, inputLongueur, inputAngle, inputDegre) {
    for (var key in inputLongueur) {
      $scope.choixCatalogue.push({
        'id_row': new Date().getTime(),
        'nom_gamme': $scope.gamme,
        'nom_module': inputNomModule,
        'num_section': key,
        'longueur': inputLongueur[key],
        'type': inputAngle[key],
        'degre': inputDegre[key]
      });
    };
  }
  //lstModules
  $scope.addModuleJson = function (inputNomModule) {
    $scope.moduleJson.push({
      "idReference": inputNomModule,
      "commentaire": null
    });
  };
  //lstSection
  $scope.addSectionJson = function (inputNomModule, inputLongueur) {
    for (var key in inputLongueur) {
      $scope.sectionJson.push({
        "longueur": inputLongueur[key],
        "refModule": inputNomModule
      });
    }
  };
  //lstAngle
  $scope.addAngleJson = function (inputNomModule, inputAngle, inputDegre) {
    for (var key in inputAngle) {
      $scope.angleJson.push({
        "type": inputAngle[key],
        "degre": inputDegre[key],
        "moduleA": inputNomModule,
        "moduleB": inputNomModule
      });
    }
  };
  // Supprimer des éléments de la liste des choix
  $scope.removeChoixCatalogueRow = function (inputIdRow) {
    var index;
    for (var i in $scope.choixCatalogue) {
      var id_row = $scope.choixCatalogue[i].id_row;
      if (id_row == inputIdRow) {
        index = i;
        break;
      }
    }
    $scope.choixCatalogue.splice(index, 1);
  };

  //Récupérer les modules correspondants à la gamme
  $scope.getMatchModule = function (inputId, inputIdGamme) {
    var resultMatchModule = false;
    for (var i = 0; i < inputIdGamme.length; i++) {
      if (inputIdGamme[i] == inputId) {
        resultMatchModule = true
      }
    }
    return resultMatchModule;
  }

  // Gestion du nombre d'angles
  $scope.nbIteration = {};
  $scope.nbAngle = [];
  max = 0;
  $scope.setNbAngle = function () {
    $scope.nbAngle = [];
    max = $scope.nbSection;
    for (var i = 0; i < max; i++) {
      $scope.nbAngle.push(i);
    }
  };

  $scope.updatePrices = function () {
    $scope.prixHT = prixToutComposantHT + $scope.margeComDevis + $scope.margeEntDevis;
    $scope.prixTTC = $scope.prixHT * 1.2;
  }
  // debug
  //$interval(function () {

  //}, 2000);


  // créer un devis
  $scope.createDevis = function () {
    var tailleRef = $scope.devisData.devis.reference.length;
    if ($scope.devisData.devis.reference.charAt(tailleRef - 2) == "v") {
      var version = $scope.devisData.devis.reference.substr(tailleRef - 1);
      version = parseInt(version) + 1;
      $scope.devisData.devis.reference = $scope.devisData.devis.reference.substring(0, tailleRef - 1) + version;
    } else {
      $scope.devisData.devis.reference += "_v0";
    }
    devisProvider.createDevis(
      $scope.devisData.client.nom,
      $scope.devisData.client.prenom,
      new Date(),
      $scope.devisData.client.tel,
      "adresseClient",
      null,
      $scope.devisData.client.mail,
      $scope.user.idMatricule,
      $scope.devisData.devis.reference,
      null,
      $scope.margeComDevis,
      $scope.margeEntDevis,
      $scope.gamme,
      $scope.moduleJson,
      //lst section
      $scope.sectionJson,
      $scope.angleJson

    ).async().then(function (response) {
      console.log("post ok");
       $window.history.back();
    }, function (error) {
      commonCode.alertErreur();
    });
    // récupération des données à finir
  }
  // Bouton retour
  $scope.returnFunction = function () {
    $window.history.back();
  };
})