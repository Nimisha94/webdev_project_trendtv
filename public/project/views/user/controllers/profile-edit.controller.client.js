(function () {
    angular
        .module('TrendTv')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($routeParams, userService, $location, currentUser) {
        var model=this;

        //model.userId=$routeParams['userId'];
        model.userId=currentUser._id;

        userService.findUserById(model.userId)
            .then(function (user) {
                model.user=user;

            }, function (err) {
                model.err='Error occured. Try again later :(';
            });

        //event handlers
        model.update=update;
        model.logout = logout;

        function update() {
            if(model.password!=='' || typeof model.password!=='undefined')
            {
                model.user.password = model.password;
            }
            userService.updateUser(model.user)
                .then(function (user) {
                    $location.url('/profileEdit');
                }, function (err) {
                    model.err='Error updating the profile';
                });
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