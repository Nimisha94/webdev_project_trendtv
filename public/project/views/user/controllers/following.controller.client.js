(function () {
    angular
        .module('TrendTv')
        .controller('FollowingController', FollowingController);

    function FollowingController(userService, $location, $routeParams, currentUser) {

        var model = this;

        //event handlers
        model.unfollow = unfollow;
        model.redirectUser = redirectUser;
        model.logout = logout;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
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