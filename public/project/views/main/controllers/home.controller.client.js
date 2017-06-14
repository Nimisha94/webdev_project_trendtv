(function () {
    angular
        .module('TrendTv')
        .controller('HomeController', HomeController);

    function HomeController(SeriesService, $location) {

        var model = this;

        SeriesService.getTrendingSeriesIds()
            .then(getTrendingsImages);

        //event handler
        model.getSeriesbyName = getSeriesbyName;

        function getTrendingsImages(ids) {
            var obj = SeriesService.getTrendingImages(ids);
            model.images=obj;
        }

        function getSeriesbyName(searchText) {
            $location.url('/search/'+searchText);
        }


    }

})();