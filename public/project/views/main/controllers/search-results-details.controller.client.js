(function () {
    angular
        .module('TrendTv')
        .controller('SearchDetailsController', SearchDetailsController);

    function SearchDetailsController($routeParams, SeriesService, $location) {

        var model = this;
        model.seriesId = $routeParams['seriesId'];


        SeriesService.getSearchDetailsById(model.seriesId)
            .then(successSearchDetails, failSearchDetails);


        function successSearchDetails(details) {
            model.details = details;
            console.log(model.details);
        }

        function failSearchDetails() {
            console.log('Failed search details')
        }
    }
})();