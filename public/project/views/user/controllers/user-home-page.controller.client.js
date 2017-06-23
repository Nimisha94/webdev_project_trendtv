(function () {
    angular
        .module('TrendTv')
        .controller('UserHomeController', UserHomeController);

    function UserHomeController(userService, SeriesService, $location, $routeParams, currentUser) {

        var model = this;

        //model.userId = $routeParams['userId'];

        model.userId = currentUser._id;

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
            var obj = SeriesService.getTrendingImages(ids);
            model.images=obj;
        }

        function getSeriesbyName(searchText) {
            $location.url('/search/'+searchText);
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