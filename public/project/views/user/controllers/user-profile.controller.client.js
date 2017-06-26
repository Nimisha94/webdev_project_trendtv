(function () {
    angular
        .module('TrendTv')
        .controller('UserProfileController', UserProfileController);

    function UserProfileController(userService, SeriesService, $route, $routeParams, $location, currentUser) {

        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.fId = $routeParams['fid'];
        model.wishlistshows=[];
        model.watchedlistshows=[];
        model.currentNavItem = 'wishlist';
        model.WishlistFlag =true;
        model.WatchedlistFlag = false;
        model.routeFlag = $routeParams['routeFlag'];
        var idx = model.routeFlag.indexOf('search');
        if(idx !== -1)
        {
            model.searchText = model.routeFlag.substring(idx+6);
            if(model.searchText[0]==='a')
            {
                console.log(model.searchText);
                model.searchRole = 'actor';
                model.searchText = model.searchText.substring(5);
            }
            else if(model.searchText[0]==='u')
            {
                model.searchRole = 'user';
                model.searchText = model.searchText.substring(4);
            }

        }

        function init() {
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

                });

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

                });
        }

        init();

        //event handlers
        model.unfollow=unfollow;
        model.follow=follow;
        model.logout = logout;
        model.showWishlist = showWishlist;
        model.showWatchedlist = showWatchedlist;
        model.getNumber = getNumber;

        function renderUser(user) {

            model.user=user;
            model.FollowingFlag=model.user.following.indexOf(model.fId);
        }

        function renderOtherUser(user) {
            model.otheruser=user;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function unfollow() {
            userService.deleteFromFollower(model.fId,model.userId)
                .then(function () {
                    userService.deleteFollowingById(model.userId,model.fId)
                        .then(function () {
                            $route.reload();
                        });
                });
        }

        function follow() {
            userService.addToFollower(model.fId, model.userId)
                .then(function () {
                    userService.addToFollowingById(model.userId,model.fId)
                        .then(function () {
                            $route.reload();
                        });
                });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function showWatchedlist() {
            model.WatchedlistFlag = true;
            model.WishlistFlag = false;
        }

        function showWishlist() {
            model.WatchedlistFlag = false;
            model.WishlistFlag = true;
        }

        function getNumber(number) {
            var arr = [];
            for(var i=0;i<number;i++)
            {
                arr.push(i);
            }
            return arr;
        }
    }
})();