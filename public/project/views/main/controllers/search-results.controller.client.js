(function () {
    angular
        .module('TrendTv')
        .controller('SearchController', SearchController);
    
    function SearchController($routeParams,SeriesService, $location) {

        var model = this;
        var tmdbId = null;
         model.searchText = $routeParams['searchText'];
        searchSeries(model.searchText);

        //event handler
        model.searchSeries = searchSeries;
        model.getSeriesDetailsbyId=getSeriesDetailsbyId;

        function searchSeries(searchText) {
            SeriesService.searchSeries(searchText)
                .then(successSearch, failSearch);
        }

        function getSeriesDetailsbyId(index) {
            //var seriesId =
            console.log(index);
            console.log(model.searchResults[index].id);
            $location.url('/search/'+model.searchText+'/'+model.searchResults[index].id+'/details');
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