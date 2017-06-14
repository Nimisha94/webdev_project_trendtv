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
            .when('/user/:userId', {
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
                //controller: 'RegisterController',
                //controllerAs: 'model'
            })
    }
}) ();
