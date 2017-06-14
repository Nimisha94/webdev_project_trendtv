(function () {
    angular
        .module('TrendTv')
        .controller('SearchPageController', SearchPageController);

    function SearchPageController($location) {

        var model=this;

        model.redirectToSearchResults=redirectToSearchResults;

        function redirectToSearchResults(searchText) {
            $location.url('/search/'+searchText);
        }

    }

})();