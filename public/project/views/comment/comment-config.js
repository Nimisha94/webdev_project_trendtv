(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/comments', {
                templateUrl: 'views/comment/templates/comment.view.client.html',
                controller: 'CommentsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/edit-comment/:commentId', {
                templateUrl: 'views/comment/templates/comment-edit.view.client.html',
                controller: 'EditCommentController',
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
