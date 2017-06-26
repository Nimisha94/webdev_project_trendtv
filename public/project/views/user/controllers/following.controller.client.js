(function () {
    angular
        .module('TrendTv')
        .controller('FollowingController', FollowingController);

    function FollowingController(userService, $location, $routeParams, currentUser) {

        var model = this;
        model.userId = currentUser._id;

        function init() {
            userService.findUserById(model.userId)
                .then(renderUser, errorUser);
        }

        init();

        //event handlers
        model.unfollow = unfollow;
        model.redirectUser = redirectUser;
        model.logout = logout;

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
            userService.findUserById(model.userId)
                .then(renderUser, errorUser);

        }

        function redirectUser(fId) {
            var url = '/finduser/following/'+fId;
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