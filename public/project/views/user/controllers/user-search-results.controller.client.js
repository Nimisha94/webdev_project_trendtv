(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchResultsController', UserSearchResultsController);

    function UserSearchResultsController($routeParams,SeriesService, $location, currentUser, userService) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = currentUser._id;

        function init() {
            searchSeries(model.searchText);

            userService.findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                });
        }

        init();

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
            $location.url('/series/search'+model.searchText+'/'+model.searchResults[index].id);
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