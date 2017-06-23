(function () {
    angular
        .module('TrendTv')
        .controller('FollowersController', FollowersController);

    function FollowersController(userService, $location, $routeParams, currentUser) {

        var model = this;
        model.userId = currentUser._id;

        //event handlers
        model.unfollow = unfollow;
        model.logout = logout;
        model.follow = follow;
        model.redirectUser = redirectUser;

        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        function unfollow(fid){
            var index = model.user.following.indexOf(fid);

            for(var i=0;i<model.user.following.length;i++){
                if(model.user.following[i]===fid){

                    userService.deleteFromFollower(fid,model.userId)
                        .then(function () {
                            userService.deleteFollowingById(model.userId,fid)
                                .then(reRenderUser, errorUser);
                        })
                }
            }
        }

        function follow(fId){
            //var index = model.user.following.indexOf(fid);

            /*for(var i=0;i<model.user.followers.length;i++){
                if(model.user.following[i]===fid){

                    userService.deleteFollowingById(model.userId,fid)
                        .then(reRenderUser, errorUser);
                }
            }*/

            userService.addToFollower(fId, model.userId)
                .then(function () {
                    userService.addToFollowingById(model.userId, fId)
                        .then(reRenderUser, errorUser);
                })
        }

        function renderUser(user) {

            model.user=user;
            var follower = [];
            //console.log(model.user.followers.length);
            for(var i =0; i<model.user.followers.length;i++) {

                userService.findUserById(model.user.followers[i])
                    .then(function (user) {
                        user.followingCount = user.following.length;
                        user.followerCount = user.followers.length;
                        follower.push(user);
                    },errorUser);
            }
            model.followerList = follower;
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function reRenderUser() {
            //var url = '/user/'+model.userId+'/following';
            userService.findUserById(model.userId)
                .then(renderUser, errorUser);

        }

        function redirectUser(fId) {
            //userService.findUserById(fId)
            //    .then(renderUser, errorUser);
            var url = '/finduser/'+fId;
            $location.url(url);
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