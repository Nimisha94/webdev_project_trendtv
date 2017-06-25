(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchResultsController', UserSearchResultsController);

    function UserSearchResultsController($routeParams,SeriesService, $location, currentUser, userService) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        searchSeries(model.searchText);

        userService.findUserById(model.userId)
            .then(function (user) {
                model.user = user
            });

        //event handlers
        model.searchSeries = searchSeries;
        model.getSeriesDetailsbyId=getSeriesDetailsbyId;
        model.logout = logout;
        model.getNumber = getNumber;

        function searchSeries(searchText) {
            SeriesService.searchSeries(searchText)
                .then(successSearch, failSearch);
        }

        function getSeriesDetailsbyId(index) {
            //var seriesId =
            //console.log(index);
            //console.log(model.searchResults[index].id);
            $location.url('/comment/'+model.searchResults[index].id);
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