(function () {
    angular
        .module('TrendTv')
        .controller('WishListController', WishListController);

    function WishListController(userService,SeriesService, $location, $routeParams,$route, currentUser) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.watchedlistshows = [];

        //event handlers
        model.getSeriesDetailsById = getSeriesDetailsById;
        model.deleteWishlistById = deleteWishlistById;
        model.logout = logout;

        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        userService.getWishListByUserId(model.userId)
            .then(function (watchedlist) {
                for (var w in watchedlist) {
                    SeriesService.getSearchDetailsById(watchedlist[w])
                        .then(function (show) {
                            console.log(typeof show.id);
                            model.watchedlistshows.push(show);
                        })
                }

            });
        function renderUser(user) {

            model.user = user;
        }

        function errorUser(user) {
            model.message = "Oops! Something went wrong :("
        }

        function getSeriesDetailsById(index){
            $location.url('/series/'+model.watchedlistshows[index].id);

        }

        function deleteWishlistById(seriesId) {
            userService.deleteWishlistById(model.userId,seriesId)
                .then(redirectUser, errorUser);
        }

        function redirectUser(status) {
            //var url = "/user/"+model.userId+"/wishList";
            //$location.url(url);
            $route.reload();
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

    }})();