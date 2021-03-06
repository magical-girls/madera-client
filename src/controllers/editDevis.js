///////////////////// Edit devis controller /////////////////////////
app.controller('editDevisCtrl', function($scope, $routeParams, devisProvider, $rootScope, userProvider,
    catalogueProvider, $mdDialog, $window, $location, authentification, commonCode, $interval) {
    $scope.authentification = authentification.validate('');
    if (!$scope.authentification) {
        $location.url("/signin");
    }
    if ($window.sessionStorage.getItem('showNav') != null) {
        $rootScope.showNav = true;
    } else {
        $rootScope.showNav = false;
    }
    $rootScope.selectedIndex = "0";
    console.log("selected index = " + $rootScope.selectedIndex);
    // Vérification du mode edition (activé ou non)
    $scope.choixCatalogue = [];
    $scope.edit = $routeParams.edit;
    var id = $routeParams.id;
    var prixToutComposantHT = 0.00;
    $scope.addClientComment = false;
    $scope.addCommercialComment = false;
    $scope.gammeIsDefined = false;
    $scope.prixHT = 0.00;
    $scope.disable = true;
    // Création des tableaux pour le post
    $scope.moduleJson = [];
    userProvider.getUser().async().then(function(response) {
        $scope.user = response.data;
    }, function(error) {
        alert('Erreur de connexion');
    });

    //si on edit, récupération des données du devis
    if ("new" != id) {
        console.log("id n'est pas new :" + id);
        $scope.new = false;
        devisProvider.getaDevis(id).async().then(function(response) {
            //récupération données utilisateur

            $scope.devisData = response.data;
            $scope.gammes = response.data.gamme;
            $scope.client = response.data.client;
            if ($scope.gammes.length != 0) {
                $scope.gammeIsDefined = true;
                $scope.selectedGammeId = $scope.gammes.idReference;
            }

            $scope.modules = response.data.modules;
            $scope.composants = response.data.composants;
            // Prix du devis
            for (var i = 0; i < $scope.composants.length; i++) {
                prixToutComposantHT += $scope.composants[i].prixHT;
                $scope.prixHT = parseFloat(prixToutComposantHT).toFixed(2);
            }
            $scope.prixTTC = parseFloat($scope.prixHT * 1.2).toFixed(2);

            catalogueProvider.getModules().async().then(function(response) {
                $scope.datasModules = response.data;

                // Création du tableau listant le contenu du devis
                if ($scope.modules.length != 0) {
                    for (var i = 0; i < $scope.modules.length; i++) {
                        $scope.choixCatalogue.push({
                            'id_row': new Date().getTime(),
                            'nom_gamme': $scope.gammes.nom,
                            'moduleA': $scope.getModuleName($scope.modules[i].moduleA.id),
                            'sectionA': $scope.modules[i].moduleA.section,
                            'longueurA': $scope.modules[i].moduleA.longueur,
                            'moduleB': $scope.getModuleName($scope.modules[i].moduleB.id),
                            'sectionB': $scope.modules[i].moduleB.section,
                            'longueurB': $scope.modules[i].moduleB.longueur,
                            'type': $scope.modules[i].typeAngle,
                            'degre': $scope.modules[i].angle
                        });
                    }
                }
            }, function(error) {
                commonCode.alertErreur();
            })
        }, function(error) {
            commonCode.alertErreur();
        });

    } else {
        console.log("id est new: " + id);
        $scope.new = true;
        $scope.comData = userProvider.getUser();

        catalogueProvider.getModules().async().then(function(response) {
            $scope.datasModules = response.data;
        }, function(error) {
            commonCode.alertErreur();
        })
    }
    // Listes déroulantes - catalogueProvider    
    catalogueProvider.getGammes().async().then(function(response) {
        $scope.datasGammes = response.data;
    }, function(error) {
        commonCode.alertErreur();
    })



    catalogueProvider.getComposants().async().then(function(response) {
        $scope.datasComposants = response.data;
    }, function(error) {
        commonCode.alertErreur();
    })

    //Gestion des commentaires
    $scope.clientComment = [];
    $scope.commercialComment = [];
    $scope.addComment = function(txt, target) {
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
    $scope.getModuleName = function(moduleID) {
        var currentModuleName = "";
        if (moduleID != null) {
            for (var i = 0; i < $scope.datasModules.length; i++) {
                if ($scope.datasModules[i].idReference == moduleID) {
                    currentModuleName = $scope.datasModules[i].commentaire;
                }
            }
        }
        return currentModuleName;
    }
    $scope.add = function() {
        $scope.addChoixCatalogueRow();
        $scope.addModuleJson();
        $scope.updatePrices();
    }
    $scope.updateComposantsHT = function(moduleRef) {
        for (var i = 0; i < $scope.datasComposants.length; i++) {
            for (var j = 0; j < $scope.datasComposants[i].idModule.length; j++) {
                if ($scope.datasComposants[i].idModule[j] == moduleRef) {
                    prixToutComposantHT += $scope.datasComposants[i].prixHT;
                }
            }
        }
        $scope.updatePrices();
    };
    // ajout des nouveaux choix pour affichage

    $scope.addChoixCatalogueRow = function() {
        $scope.selectedGamme = "";
        if ($scope.gammes != null) {
            $scope.selectedGamme = $scope.gammes.nom;
        } else {
            $scope.selectedGamme = $scope.gamme;
        }
        $scope.choixCatalogue.push({
            'id_row': new Date().getTime(),
            'nom_gamme': $scope.selectedGamme,
            'moduleA': $scope.getModuleName($scope.moduleA),
            'sectionA': $scope.sectionA,
            'longueurA': $scope.longueurA,
            'moduleB': $scope.getModuleName($scope.moduleB),
            'sectionB': $scope.sectionB,
            'longueurB': $scope.longueurB,
            'type': $scope.typeAngle,
            'degre': $scope.degre
        });
    }

    //lstModules
    $scope.addModuleJson = function() {
        $scope.moduleJson.push({
            "idChoixModule": null,
            "moduleA": {
                "id": $scope.moduleA,
                "section": $scope.sectionA,
                "longueur": $scope.longueurA
            },
            "idChoixModule": null,
            "moduleB": {
                "id": $scope.moduleB,
                "section": $scope.sectionB,
                "longueur": $scope.longueurB
            },
            "typeAngle": $scope.typeAngle,
            "Angle": $scope.Angle
        });
        $scope.updateComposantsHT($scope.moduleA);
        if ($scope.moduleB != null) {
            $scope.updateComposantsHT($scope.moduleB);
        }
    };

    // Supprimer des éléments de la liste des choix
    $scope.removeChoixCatalogueRow = function(inputIdRow) {
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

    $scope.updatePrices = function() {
        $scope.prixHT = parseFloat(prixToutComposantHT + (1 + ($scope.margeComDevis / 100)) + (1 + ($scope.margeEntDevis / 100))).toFixed(2);
        $scope.prixTTC = parseFloat($scope.prixHT * 1.2).toFixed(2);
    };

    // Fonction pour controller le form et déterminer si création ou update
    $scope.mySubmit = function() {
        // if (devisForm.$valid) {
        // si update
        if ("new" != id) {
            updateDevis();
        }
        //sinon création
        else {
            createDevis();
        }
        /* } else {
             console.log("devis non valide");
             commonCode.showAlertFieldsEmpty();
         }*/
    }

    // créer un devis
    createDevis = function() {
        devisProvider.createDevis(
            $scope.devisData.client.nom,
            $scope.devisData.client.prenom,
            "09-07-2002",
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
            $scope.moduleJson
        ).async().then(function(response) {
            console.log("post create ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
    };

    //update devis
    updateDevis = function() {
        $scope.devisData.devis.status = $scope.statut;
        console.log($scope.devisData.devis.status);
        devisProvider.updateDevis(
            $scope.client,
            $scope.devisData.devis,
            $scope.gamme,
            $scope.moduleJson
        ).async().then(function(response) {
            console.log("post put ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
    };

    // Delete devis

    $scope.deleteDevis = function() {
        commonCode.showConfirmDel("a", "delete devis");
        /*var jsonDel = { "reference": $scope.devisData.devis.reference };
        devisProvider.deleteDevis(
            angular.toJson(jsonDel)
        ).async().then(function(response) {
            console.log("delete ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
        */
    };

    // envoi email
    $scope.sendEmail = function() {
        commonCode.showConfirmEmail("", $scope.devisData.devis.reference);
    }
    $scope.sendEmailNoAlert = function() {
            devisProvider.sendEmail(
                $scope.devisData.devis.reference
            ).async().then(function(response) {
                console.log("send email ok");
            }, function(error) {
                console.log("send email failed");
            })
        }
        // Bouton retour
    $scope.returnFunction = function() {
        $window.history.back();
    };
})