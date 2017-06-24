(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/posts',{
                templateUrl: 'views/post/templates/posts.view.client.html',
                controller: 'PostsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/edit-post/:postId', {
                templateUrl: 'views/post/templates/post-edit.view.client.html',
                controller: 'EditPostController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
    }

    function checkLoggedIn(userService, $q,$location) {
        var deffered = $q.defer();

        userService.loggedIn()
            .then(function (user) {
                if(user ==='0'){
                    console.log(user);
                    deffered.reject();
                    $location.url('/login');
                }
                else if(user.role === 'admin')
                {
                    deffered.resolve(user);
                    $location.url('/admin');
                }
                else{
                    deffered.resolve(user);
                }
            });

        return deffered.promise;
    }
}) ();
