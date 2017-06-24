(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/admin',{
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkAdmin
                }
            })
    }

    function checkAdmin(userService, $q,$location) {
        var deffered = $q.defer();

        userService.loggedIn()
            .then(function (user) {
                if(user ==='0'){
                    deffered.reject();
                    $location.url('/login')
                }
                else if (user.role === 'admin'){
                    deffered.resolve(user);
                }
                else{
                    deffered.reject();
                    $location.url('/');
                }
            });

        return deffered.promise;
    }

}) ();
