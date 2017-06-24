(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/user/templates/user-home-page.view.client.html',
                controller: 'UserHomeController',
                controllerAs: 'model',
                resolve:{
                    currentUser:checkCurrentUser
                }
            })
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
            .when('/comment/:seriesId', {
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
                    currentUser:checkAdminLoggedIn
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
            .when('/profile-edit-mobile',{
                templateUrl: 'views/user/templates/profile-edit-mobile.view.client.html',
                controller: 'ProfileEditController',
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
}) ();
