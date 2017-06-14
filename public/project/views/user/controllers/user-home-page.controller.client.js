(function () {
    angular
        .module('TrendTv')
        .controller('UserHomeController', UserHomeController);

    function UserHomeController(userService, SeriesService, $location, $routeParams) {

        var model = this;

        model.userId = $routeParams['userId'];

        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        function renderUser(user) {
            model.user=user;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

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