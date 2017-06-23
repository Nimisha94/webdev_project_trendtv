(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            /*.when('/', {
                templateUrl: 'views/main/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })*/
            .when('/', {
                templateUrl: 'views/user/templates/user-home-page.view.client.html',
                controller: 'UserHomeController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            /*.when('/search/:searchText', {
                templateUrl: 'views/main/templates/search-results.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model'
            })*/
            /*.when('/search', {
                templateUrl: 'views/main/templates/search.view.client.html',
                controller: 'SearchPageController',
                controllerAs: 'model'
            })*/
            /*.when('/search/:searchText/:seriesId/details', {
                templateUrl: 'views/main/templates/search-results-details.view.client.html',
                controller: 'SearchDetailsController',
                controllerAs: 'model'
            })*/
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
            //to be done
            /*.when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })*/
            .when('/finduser/:fid', {
                templateUrl: 'views/user/templates/user-profile.view.client.html',
                controller: 'UserProfileController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/following', {
                templateUrl: 'views/user/templates/following.view.client.html',
                controller: 'FollowingController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/follower', {
                templateUrl: 'views/user/templates/followers.view.client.html',
                controller: 'FollowersController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/comments', {
                templateUrl: 'views/user/templates/comment.view.client.html',
                controller: 'CommentsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/edit-comment/:commentId', {
                templateUrl: 'views/user/templates/comment-edit.view.client.html',
                controller: 'EditCommentController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/series/:seriesId', {
                templateUrl: 'views/user/templates/user-series-details.view.client.html',
                controller: 'ViewSeriesController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/search', {
                templateUrl: 'views/user/templates/user-search.view.client.html',
                controller: 'UserSearchController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/search/:searchText', {
                templateUrl: 'views/user/templates/user-search-results.view.client.html',
                controller: 'UserSearchResultsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
            .when('/search/:searchRole/:searchText', {
                templateUrl: 'views/user/templates/user-search-users-results.view.client.html',
                controller: 'UserSearchUserResultsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            /*.when('/user/:userId/searchActor/:searchText', {
                templateUrl: 'views/user/templates/user-search-users-results.view.client.html',
                controller: 'UserSearchUserResultsController',
                controllerAs: 'model'
            })*/
            .when('/watchList', {
                templateUrl: 'views/user/templates/watchList.view.client.html',
                controller: 'WatchListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/wishList', {
                templateUrl: 'views/user/templates/wishList.view.client.html',
                controller: 'WishListController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/profileEdit',{
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'ProfileEditController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkAdminLoggedIn //checkLoggedIn
                }
            })
            .when('/admin',{
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkAdmin
                }
            })
            .when('/posts',{
                templateUrl: 'views/user/templates/posts.view.client.html',
                controller: 'PostsController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/edit-post/:postId', {
                templateUrl: 'views/user/templates/post-edit.view.client.html',
                controller: 'EditPostController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/activityfeed',{
                templateUrl: 'views/user/templates/user-activityfeed.view.client.html',
                controller: 'ActivityFeedController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
    }

    function checkAdminLoggedIn(userService, $q,$location) {
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
                }
                else{
                    deffered.resolve(user);
                }
            });

        return deffered.promise;
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


    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();

        userService
            .loggedIn()
            .then(function (user) {
                if(user.role === 'admin')
                {
                    deferred.resolve(user);
                    $location.url('/admin');
                }
                else if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
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
