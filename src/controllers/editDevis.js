///////////////////// Edit devis controller /////////////////////////
app.controller('editDevisCtrl', function($scope, $routeParams, devisProvider, userProvider,
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
            if ($scope.gammes.length != 0) {
                $scope.gammeIsDefined = true;
                $scope.selectedGammeId = $scope.gammes.idReference;
            }

            $scope.modules = response.data.modules;
            $scope.composants = response.data.lstComposant;

            // Prix du devis
            for (var i = 0; i < $scope.composants.length; i++) {
                prixToutComposantHT += $scope.composants[i].prixHT;
                $scope.prixHT = prixToutComposantHT;
            }
            $scope.prixTTC = $scope.prixHT * 1.2;

            // Création du tableau listant le contenu du devis

            if ($scope.modules.length != 0) {
                for (var i = 0; i < $scope.modules.length; i++) {
                    $scope.choixCatalogue.push({
                        'id_row': new Date().getTime(),
                        'nom_gamme': $scope.gammes.nom,
                        'moduleA': $scope.modules[i].moduleA.id,
                        'sectionA': $scope.modules[i].moduleA.section,
                        'longueurA': $scope.modules[i].moduleA.longueur,
                        'moduleB': $scope.modules[i].moduleB.id,
                        'sectionB': $scope.modules[i].moduleB.section,
                        'longueurB': $scope.modules[i].moduleB.longueur,
                        'type': $scope.modules[i].typeAngle,
                        'degre': $scope.modules[i].Angle
                    });
                }
            }
        }, function(error) {
            commonCode.alertErreur();
        });

    } else {
        console.log("id est new: " + id);
        $scope.new = true;
        $scope.comData = userProvider.getUser();
    }
    // Listes déroulantes - catalogueProvider    
    catalogueProvider.getGammes().async().then(function(response) {
        $scope.datasGammes = response.data;
    }, function(error) {
        commonCode.alertErreur();
    })

    catalogueProvider.getModules().async().then(function(response) {
        $scope.datasModules = response.data;
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

    $scope.add = function(inputNomGamme, inputNomModule, inputLongueur, inputAngle, inputDegre) {

            $scope.addChoixCatalogueRow(inputNomGamme, inputNomModule, inputLongueur, inputAngle, inputDegre);
            $scope.addModuleJson(inputNomModule);
            $scope.addSectionJson(inputNomModule, inputLongueur);
            $scope.addAngleJson(inputNomModule, inputAngle, inputDegre);
            $scope.updatePrices();

        }
        // ajout des nouveaux choix pour affichage

    $scope.addChoixCatalogueRow = function() {
        $scope.choixCatalogue.push({
            'id_row': new Date().getTime(),
            'nom_gamme': $scope.gammes.nom,
            'moduleA': $scope.moduleA,
            'sectionA': $scope.sectionA,
            'longueurA': $scope.longueurA,
            'moduleB': $scope.moduleB,
            'sectionB': $scope.sectionB,
            'longueurB': $scope.longueurB,
            'type': $scope.typeAngle,
            'degre': $scope.degre
        });
    }

    //lstModules
    $scope.addModuleJson = function(inputNomModule, inputLongueur) {
        for (var key in inputLongueur) {
            $scope.sectionJson.push({
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
        $scope.prixHT = prixToutComposantHT + (1 + ($scope.margeComDevis / 100)) + (1 + ($scope.margeEntDevis / 100));
        $scope.prixTTC = $scope.prixHT * 1.2;
    };
    // debug
    //$interval(function () {

    //}, 2000);


    // créer un devis
    $scope.createDevis = function() {
        /* var tailleRef = $scope.devisData.devis.reference.length;
         if ($scope.devisData.devis.reference.charAt(tailleRef - 2) == "v") {
           var version = $scope.devisData.devis.reference.substr(tailleRef - 1);
           version = parseInt(version) + 1;
           $scope.devisData.devis.reference = $scope.devisData.devis.reference.substring(0, tailleRef - 1) + version;
         } else {
           $scope.devisData.devis.reference += "_v1";
         }*/
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
            $scope.moduleJson
        ).async().then(function(response) {
            console.log("post ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
    };
    //update devis
    $scope.updateDevis = function() {
        devisProvider.updateDevis(
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
            $scope.moduleJson
        ).async().then(function(response) {
            console.log("post ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
    };

    // Delete devis

    $scope.deleteDevis = function() {
        var jsonDel = { "reference": $scope.devisData.devis.reference };
        devisProvider.deleteDevis(
            angular.toJson(jsonDel)
        ).async().then(function(response) {
            console.log("delete ok");
            $window.history.back();
        }, function(error) {
            commonCode.alertErreur();
        });
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