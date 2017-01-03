'use strict';
app.service('commonCode', function (devisProvider, fournisseursProvider, $mdDialog) {

    var that = this;

    var allowedAction = ["deleteDevis", "deleteGamme", "deleteComposant", "deleteFournisseur", "deleteModule"];
    this.isAllowedAction = function(inputAction){
        var result = false;
        for (var i = 0 ; i < allowedAction.length ; i++){
            if (inputAction == allowedAction[i]){
                result = true;
            }
        }
        return result;
    };

    this.deleteSomething = function(inputId, action) {

        var result = null;

        if (this.isAllowedAction(action) == true){

            if (inputId != undefined && action != undefined){
                switch(action){
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
        }

        return result;
    };

    this.showConfirm = function ($event, action) {
        console.log("debugtest" + action);
            var confirm = $mdDialog.confirm()
                .title('Etes-vous sur de vouloir supprimer cet élément?')
                .ariaLabel('TutorialsPoint.com')
                .targetEvent(event)
                .ok('Oui')
                .cancel('Non');
            $mdDialog.show(confirm).then(function () {
                //$scope.status = 'Record deleted successfully!';
                that.deleteSomething($event, action)
            }, function () {
                this.status = 'You decided to keep your record.';
            });
    };

})