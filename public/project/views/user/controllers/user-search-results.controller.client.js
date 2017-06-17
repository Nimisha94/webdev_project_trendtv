(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchResultsController', UserSearchResultsController);

    function UserSearchResultsController($routeParams,SeriesService, $location) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = $routeParams['userId'];
        searchSeries(model.searchText);

        //event handlers
        model.searchSeries = searchSeries;
        model.getSeriesDetailsbyId=getSeriesDetailsbyId;

        function searchSeries(searchText) {
            SeriesService.searchSeries(searchText)
                .then(successSearch, failSearch);
        }

        function getSeriesDetailsbyId(index) {
            //var seriesId =
            //console.log(index);
            //console.log(model.searchResults[index].id);
            $location.url('/user/'+model.userId+'/series/'+model.searchResults[index].id);
        }
        function successSearch(searchResultsArr) {
            console.log(searchResultsArr);
            model.searchResults = searchResultsArr;
            //$location.url('/search');
            //var tracktObj = JSON.parse(tracktJson);
            //console.log(tracktJson[0].show.title)
            //tmdbId = tracktJson[0].show.ids.tmdb;
            //var tmdbObj = parsedJson.results[0].original_name;
            //console.log(tmdbObj)
        }
        function failSearch() {
            console.log('search failure');
        }

    }

})();