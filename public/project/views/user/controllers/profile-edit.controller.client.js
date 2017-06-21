(function () {
    angular
        .module('TrendTv')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($routeParams, userService, $location) {
        var model=this;

        model.userId=$routeParams['userId'];

        userService.findUserById(model.userId)
            .then(function (user) {
                model.user=user;

            }, function (err) {
                model.err='Error occured. Try again later :(';
            });

        model.update=update;

        function update() {
            if(model.password!=='' || typeof model.password!=='undefined')
            {
                model.user.password = model.password;
            }
            userService.updateUser(model.user)
                .then(function (user) {
                    $location.url('/user/'+model.userId);
                }, function (err) {
                    model.err='Error updating the profile';
                });
        }
    }
})();