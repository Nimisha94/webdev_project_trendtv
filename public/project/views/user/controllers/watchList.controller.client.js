(function () {
    angular
        .module('TrendTv')
        .controller('WatchListController', WatchListController);

    function WatchListController(userService,SeriesService, $location, $routeParams,$route, currentUser) {

        var model = this;
        var tmdbId = null;
        model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.watchedlistshows =[];

        function init() {
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
        }

        init();

        //event handlers
        model.searchSeries = searchSeries;
        model.getSeriesDetailsById=getSeriesDetailsById;
        model.deleteWatchlistById = deleteWatchlistById;
        model.logout = logout;
        model.getNumber = getNumber;

        function deleteWatchlistById(seriesId) {
            userService.deleteWatchlistById(model.userId,seriesId)
                .then(redirectUser, errorUser);
        }

        function renderUser(user) {

            model.user=user;
        }

        function redirectUser(status) {
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
            $location.url('/series/watchedList/'+model.watchedlistshows[index].id);

        }


        function successSearch(searchResultsArr) {
            model.searchResults = searchResultsArr;

        }
        function failSearch() {
            model.err = 'search failure';
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

    }
})();