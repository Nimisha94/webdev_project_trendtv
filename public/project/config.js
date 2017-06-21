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
                templateUrl: 'views/user/templates/user-profile.view.client.html',
                controller: 'UserProfileController',
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
            .when('/user/:userId/searchUser/:searchText', {
                templateUrl: 'views/user/templates/user-search-users-results.view.client.html',
                controller: 'UserSearchUserResultsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/watchList', {
                templateUrl: 'views/user/templates/watchList.view.client.html',
                controller: 'WatchListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/wishList', {
                templateUrl: 'views/user/templates/wishList.view.client.html',
                controller: 'WishListController',
                controllerAs: 'model'
            })
            .when('/user/:userId/profile-edit',{
                templateUrl: 'views/user/templates/profile-edit.view.client.html',
                controller: 'ProfileEditController',
                controllerAs: 'model'
            })
            .when('/admin',{
                templateUrl: 'views/admin/templates/admin.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model'
            })
            .when('/user/:userId/posts',{
                templateUrl: 'views/user/templates/posts.view.client.html',
                controller: 'PostsController',
                controllerAs: 'model'
            })
            .when('/user/:userId/edit-post/:postId', {
                templateUrl: 'views/user/templates/post-edit.view.client.html',
                controller: 'EditPostController',
                controllerAs: 'model'
            })
            .when('/user/:userId/activityfeed',{
                templateUrl: 'views/user/templates/user-activityfeed.view.client.html',
                controller: 'ActivityFeedController',
                controllerAs: 'model'
            })
    }
}) ();
