app.factory('authentification', function($window, $http){

    return {
        readToken: function () {
            return $window.localStorage.getItem('token');
        },
        setToken: function() {
            // Todo : Update to get jwt from webservice
            var fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
            $window.localStorage.setItem('token', fakeToken);
        },
        deleteToken: function() {
            $window.localStorage.removeItem('token');
        },
        verrifyToken: function(){
            // Todo : Update to check if token is available
            //var decoded = jwt_decode($window.localStorage.getItem('token'));
            //console.log(decoded);
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