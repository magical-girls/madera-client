const host = 'http://78.198.68.4:12345/maderaserveur/';
app.factory('authentification', function($window, $http){

    return {
        readToken: function () {
            return $window.sessionStorage.getItem('token');
        },
        setToken: function(login, pass) {
        	
            $http({
            	method : 'GET',
            	url : host + 'login',
            	params : {
            		name : login,
            		pwd : window.atob(pass)
            		},
            	headers: { 
            		'Content-type' : 'application/json; charset=UTF-8'
	        		}
    	       })
    	    .then(function(response) {
    	    	$window.sessionStorage.setItem('token', response.headers()["token"]);
    	    	$window.sessionStorage.setItem('login', response.data.login.login);
    	    	$window.sessionStorage.setItem('matricule', response.data.login.matriculeSalarie);
    	    	$window.sessionStorage.setItem('nom', response.data.salarie.nom);
    	    	$window.sessionStorage.setItem('prenom', response.data.salarie.prenom);
    	    	return true;
    	    }, function(error) {
    	    	if(response.status === 401){
    	    		alert('Erreur d\'authentification')
    	    	} else {
    				alert('Erreur serveur');
    			}
    	    	return false;
    	    });
            
        },
        deleteToken: function() {
            $window.sessionStorage.clear();
            },
        verrifyToken: function(){
            return this.readToken() == null ? false : true;
        },
        validate: function(requiredRole){
            if (this.verrifyToken() == false){
                if (requiredRole == 'admin'){
                    $window.location.href = 'index.html#!/view1';
                } 
                return false;
            }
            return true;
        }
    };  
});