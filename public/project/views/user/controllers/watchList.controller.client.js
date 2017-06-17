(function () {
    angular
        .module('TrendTv')
        .controller('WatchListController', WatchListController);

    function WatchListController(userService,SeriesService, $location, $routeParams) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = $routeParams['userId'];
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

        function renderUser(user) {

            model.user=user;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function searchSeries(searchText) {
            SeriesService.searchSeries(searchText)
                .then(successSearch, failSearch);
        }


        function getSeriesDetailsById(watchListArr){
            var resultsArr = [];
            for(var i in watchListArr){
                SeriesService.getSeriesDetailsById(watchListArr[i])
                    .then(function (seriesDetail) {
                        console.log(seriesDetail);
                        resultsArr.push(seriesDetail);
                    }, failSearch)
                    .then(successSearch(resultsArr),failSearch());
            }

        }


        function successSearch(searchResultsArr) {
            console.log(searchResultsArr);
            model.searchResults = searchResultsArr;

        }
        function failSearch() {
            console.log('search failure');
        }

    }






})();