(function () {
    angular
        .module('TrendTv')
        .controller('WishListController', WishListController);

    function WishListController(userService,SeriesService, $location, $routeParams,$route, currentUser) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = currentUser._id;
        model.watchedlistshows = [];

        function init() {
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
        }

        init();

        //event handlers
        model.getSeriesDetailsById = getSeriesDetailsById;
        model.deleteWishlistById = deleteWishlistById;
        model.logout = logout;
        model.getNumber = getNumber;


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

        function getNumber(number) {
            var arr = [];
            for(var i=0;i<number;i++)
            {
                arr.push(i);
            }
            return arr;
        }

    }})();