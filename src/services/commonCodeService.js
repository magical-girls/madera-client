'use strict';
app.service('commonCode', function(devisProvider, fournisseursProvider, $mdDialog) {

    var that = this;

    var allowedAction = [ /*"deleteDevis", "deleteGamme", "deleteComposant", "deleteFournisseur", "deleteModule"*/ ];
    this.isAllowedAction = function(inputAction) {
        var result = false;
        for (var i = 0; i < allowedAction.length; i++) {
            if (inputAction == allowedAction[i]) {
                result = true;
            }
        }
        return result;
    };

    // Supprimer un élément
    this.deleteSomething = function(inputId, action) {

        var result = null;

        if (this.isAllowedAction(action) == true) {

            if (inputId != undefined && action != undefined) {
                switch (action) {
                    case "deleteDevis":
                        for (var i = 0; i < devis.length; i++) {
                            if (inputId == devis[i].num_devis) {
                                devis.splice(i, 1);
                            }
                        }
                        break;
                    case "deleteGamme":
                        for (var i = 0; i < gammes.length; i++) {
                            if (inputId == gammes[i].id_gamme) {
                                gammes.splice(i, 1);
                            }
                        }
                        break;
                    case "deleteModule":
                        for (var i = 0; i < modules.length; i++) {
                            if (inputId == modules[i].id_module) {
                                modules.splice(i, 1);
                            }
                        }
                        break;
                    case "deleteComposant":
                        for (var i = 0; i < composants.length; i++) {
                            if (inputId == composants[i].id_composant) {
                                composants.splice(i, 1);
                            }
                        }
                        break;
                    case "deleteFournisseur":
                        for (var i = 0; i < fournisseurs.length; i++) {
                            if (inputId == fournisseurs[i].id_fournisseur) {
                                fournisseurs.splice(i, 1);
                            }
                        }
                        break;
                }
            } else {
                console.log("showConfirm() - Valeur undefined détectée : inputId = " + inputId + " ; action = " + action);

            }

        } else {
            console.log("showConfirm() - Illegal action : " + action);
            showAlert();
        }

        return result;
    };
    //Modal de confirmation
    this.showConfirmDel = function($event, action) {
        console.log("debugtest" + action);
        var confirm = $mdDialog.confirm()
            .title('Etes-vous sur de vouloir supprimer cet élément?')
            .ariaLabel('TutorialsPoint.com')
            .targetEvent(event)
            .ok('Oui')
            .cancel('Non');
        $mdDialog.show(confirm).then(function() {
            //$scope.status = 'Record deleted successfully!';
            that.deleteSomething($event, action)
        }, function() {
            this.status = 'You decided to keep your record.';
        });

    };

    this.showConfirmEmail = function($event, idDevis) {
        console.log("idDevis = " + idDevis);
        var confirm = $mdDialog.confirm()
            .title('Etes-vous sur de vouloir envoyer un e-mail?')
            .ariaLabel('TutorialsPoint.com')
            .targetEvent(event)
            .ok('Oui')
            .cancel('Non');
        $mdDialog.show(confirm).then(function() {
            devisProvider.sendEmail(
                idDevis
            ).async().then(function(response) {
                console.log("send email ok");
            }, function(error) {
                console.log("send email failed");
            })
        }, function() {
            console.log('Mail not sended.');
        });

    };

    this.showForbidden = function() {
        showAlert();
    }

    this.alertErreur = function() {
        showAlertErreur();
    }

    function showAlert() {
        alert = $mdDialog.alert({
            title: 'INTERDICTION',
            textContent: "Seul le Bureau d'Etude est autorisé à cette action",
            ok: 'Fermer'
        });

        $mdDialog
            .show(alert)
            .finally(function() {
                alert = undefined;
            });
    }

    function showAlertErreur() {
        alert = $mdDialog.alert({
            title: 'Erreur',
            textContent: "Une erreur est survenue",
            ok: 'Fermer'
        });

        $mdDialog
            .show(alert)
            .finally(function() {
                alert = undefined;
            });
    }

})