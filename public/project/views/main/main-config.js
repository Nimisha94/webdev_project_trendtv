(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'views/main/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model',
                resolve:{
                    curentUser:check
                }
            })
            .when('/register', {
                templateUrl: 'views/main/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model',
                resolve:{
                    curentUser:checkRegister
                }
            })
    }

    function check(userService, $q, $location,$route) {
        var deferred = $q.defer();

        userService
            .loggedIn()
            .then(function (user) {
                console.log(user);
                if(user.role === 'admin')
                {
                    deferred.resolve(user);
                    $location.url('/admin');
                }
                else if(user.role === 'user' || user.role === 'actor') {
                    deferred.resolve(user);
                    $location.url('/');
                }
                else if(user === '0'){
                    console.log(user);
                    deferred.resolve({});
                    //$location.url('/login')

                }
            });

        return deferred.promise;
    }

    function checkRegister(userService, $q, $location,$route) {
        var deferred = $q.defer();

        userService
            .loggedIn()
            .then(function (user) {
                console.log(user);
                if(user.role === 'admin')
                {
                    deferred.resolve(user);
                    $location.url('/admin');
                }
                else if(user.role === 'user' || user.role === 'actor') {
                    deferred.resolve(user);
                    $location.url('/');
                }
                else if(user === '0'){
                    console.log(user);
                    deferred.resolve({});
                    //$location.url('/login')

                }
            });

        return deferred.promise;
    }
}) ();
