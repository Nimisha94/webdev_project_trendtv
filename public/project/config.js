(function () {
    angular
        .module('TrendTv')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main/templates/home.view.client.html',
                controller: 'HomeController',
                controllerAs: 'model'
            })
            .when('/home/user/:userId', {
                templateUrl: 'views/user/templates/user-home-page.view.client.html',
                controller: 'UserHomeController',
                controllerAs: 'model'
            })
            .when('/search/:searchText', {
                templateUrl: 'views/main/templates/search-results.view.client.html',
                controller: 'SearchController',
                controllerAs: 'model'
            })
            .when('/search', {
                templateUrl: 'views/main/templates/search.view.client.html',
                controller: 'SearchPageController',
                controllerAs: 'model'
            })
            .when('/search/:searchText/:seriesId/details', {
                templateUrl: 'views/main/templates/search-results-details.view.client.html',
                controller: 'SearchDetailsController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: 'views/main/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: 'views/main/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when('/user/:userId', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/finduser/:fid', {
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })
            .when('/user/:userId/following', {
                templateUrl: 'views/user/templates/following.view.client.html',
                controller: 'FollowingController',
                controllerAs: 'model'
            })
            .when('/user/:userId/follower', {
                templateUrl: 'views/user/templates/followers.view.client.html',
                controller: 'FollowersController',
                controllerAs: 'model'
            })
            .when('/user/:userId/comments', {
                templateUrl: 'views/user/templates/comment.view.client.html',
                controller: 'CommentsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/edit-comment/:commentId', {
                templateUrl: 'views/user/templates/comment-edit.view.client.html',
                controller: 'EditCommentController',
                controllerAs: 'model'
            })
            .when('/user/:userId/series/:seriesId', {
                templateUrl: 'views/user/templates/user-series-details.view.client.html',
                controller: 'ViewSeriesController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search', {
                templateUrl: 'views/user/templates/user-search.view.client.html',
                controller: 'UserSearchController',
                controllerAs: 'model'
            })
            .when('/user/:userId/search/:searchText', {
                templateUrl: 'views/user/templates/user-search-results.view.client.html',
                controller: 'UserSearchResultsController',
                controllerAs: 'model'
            })
    }
}) ();
