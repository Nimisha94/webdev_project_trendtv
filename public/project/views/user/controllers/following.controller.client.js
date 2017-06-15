(function () {
    angular
        .module('TrendTv')
        .controller('FollowingController', FollowingController);

    function FollowingController(userService, $location, $routeParams) {

        var model = this;
        model.unfollow=unfollow;

        model.userId = $routeParams['userId'];
        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        function unfollow(fid){
            var index = model.user.following.indexOf(fid);
            console.log(fid);
            console.log(model.user.following);
            for(var i=0;i<model.user.following.length;i++){
                if(model.user.following[i]===fid){
                    userService.deleteFollowingById(fid);
                }
            }
        }

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