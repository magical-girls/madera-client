const host = 'http://78.198.68.4:12345/maderaserveur/';
//const host = 'http://localhost:80/maderaserveur/';

app.factory('authentification', function($window, $http, $rootScope) {

    return {
        readToken: function() {
            return $window.sessionStorage.getItem('token');
        },
        setToken: function(login, pass) {
            var check;
            $http({
                method: 'GET',
                url: host + 'login',
                params: {
                    name: login,
                    pwd: window.btoa(unescape(encodeURIComponent(pass)))
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            }).then(function(response) {
                $window.sessionStorage.setItem('token', response.headers()["token"]);
                $window.sessionStorage.setItem('login', response.data.login.login);
                $window.sessionStorage.setItem('matricule', response.data.login.matriculeSalarie);
                $window.sessionStorage.setItem('nom', response.data.salarie.nom);
                $window.sessionStorage.setItem('prenom', response.data.salarie.prenom);
                console.log("check1 =" + check);
                $rootScope.check = true;

            }, function(error) {
                if (error.status === 401) {
                    alert('Erreur d\'authentification')
                } else {
                    alert('Erreur serveur');
                }
                check = false;
                console.log("check2 =" + check);
                $rootScope.check = false;
            });
        },
        deleteToken: function() {
            $window.sessionStorage.clear();
        },
        verrifyToken: function() {
            return this.readToken() == null ? false : true;
        },
        validate: function(requiredRole) {
            if (this.verrifyToken() == false) {
                if (requiredRole == 'admin') {
                    $window.location.href = 'index.html#!/view1';
                }
                return false;
            }
            return true;
        }
    };
});