(function () {
    angular
        .module('TrendTv')
        .controller('UserHomeController', UserHomeController);

    function UserHomeController(userService, SeriesService, $location, $routeParams, currentUser) {

        var model = this;
        model.loading = true;

        model.userId = currentUser._id;

        function init() {
            userService.findUserById(model.userId)
                .then(renderUser, errorUser);

            SeriesService.getTrendingSeriesIds()
                .then(getTrendingsImages)
                .finally(function () {
                model.loading = false;
            });
        }

        init();

        //event handlers
        model.getSeriesbyName = getSeriesbyName;
        model.logout = logout;

        function getTrendingsImages(ids) {
            var index = ids.indexOf(4551);
            if(index !== -1)
            {
                ids.splice(index,1);
            }
            else
            {
                ids.splice(ids.length-1, 1);
            }
            model.ids = ids;
            var obj = SeriesService.getTrendingImages(ids);
            model.images=obj;
        }

        function getSeriesbyName(searchText) {
            $location.url('/search/'+searchText);
        }

        function renderUser(user) {
            model.user=user;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }


    }

})();