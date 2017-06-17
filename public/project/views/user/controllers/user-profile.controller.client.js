(function () {
    angular
        .module('TrendTv')
        .controller('UserProfileController', UserProfileController);

    function UserProfileController(userService, SeriesService, $location, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];
        model.fId = $routeParams['fid'];
        model.wishlistshows=[];
        model.watchedlistshows=[];

        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        userService.findUserById(model.fId)
            .then(renderOtherUser, errorUser);

        userService.getWishListByUserId(model.fId)
            .then(function (wishlist) {
                for(var w in wishlist)
                {
                    SeriesService.getSearchDetailsById(wishlist[w])
                        .then(function (show) {
                            model.wishlistshows.push(show);
                        })
                }
                model.wishlistimages=SeriesService.getTrendingImages(wishlist);

            })

        userService.getWatchedListByUserId(model.fId)
            .then(function (watchedlist) {
                for(var w in watchedlist)
                {
                    SeriesService.getSearchDetailsById(watchedlist[w])
                        .then(function (show) {
                            model.watchedlistshows.push(show);
                        })
                }
                model.watchedlistimages=SeriesService.getTrendingImages(watchedlist);

            })

        function renderUser(user) {

            model.user=user;
        }

        function renderOtherUser(user) {
            model.otheruser=user;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }
    }
})();