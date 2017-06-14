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
            var following = [];

            for(var i =0; i<model.user.following.length;i++) {
                userService.findUserById(model.user.following[i])
                    .then(function (user) {
                         user.followingCount = user.following.length;
                        user.followerCount = user.followers.length;
                        following.push(user);
                    },errorUser);
            }
             model.followingList = following;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }
    }
})();