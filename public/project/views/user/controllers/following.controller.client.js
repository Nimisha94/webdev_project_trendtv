(function () {
    angular
        .module('TrendTv')
        .controller('FollowingController', FollowingController);

    function FollowingController(userService, $location, $routeParams) {

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
    }
})();