(function () {
    angular
        .module('TrendTv')
        .controller('WatchListController', WatchListController);

    function WatchListController(userService,SeriesService, $location, $routeParams,$route, currentUser) {

        var model = this;
        var tmdbId = null;
        //model.searchText = $routeParams['searchText'];
        model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.watchedlistshows =[];


        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        userService.getWatchedListByUserId(model.userId)
            .then(function (watchedlist) {
                for(var w in watchedlist)
                {
                    SeriesService.getSearchDetailsById(watchedlist[w])
                        .then(function (show) {
                            console.log(show);
                            model.watchedlistshows.push(show);
                        })
                }

            });

        //searchSeries(model.searchText);

        //event handlers
        model.searchSeries = searchSeries;
        model.getSeriesDetailsById=getSeriesDetailsById;
        model.deleteWatchlistById = deleteWatchlistById;
        model.logout = logout;

        function deleteWatchlistById(seriesId) {
            userService.deleteWatchlistById(model.userId,seriesId)
                .then(redirectUser, errorUser);
        }

        function renderUser(user) {

            model.user=user;
        }

        function redirectUser(status) {
            //var url = "/user/"+model.userId+"/wishList";
            //$location.url(url);
            $route.reload();
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function searchSeries(searchText) {
            SeriesService.searchSeries(searchText)
                .then(successSearch, failSearch);
        }


        function getSeriesDetailsById(index){
            $location.url('/series/'+model.watchedlistshows[index].id);

        }


        function successSearch(searchResultsArr) {
            console.log(searchResultsArr);
            model.searchResults = searchResultsArr;

        }
        function failSearch() {
            console.log('search failure');
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

    }






})();