(function () {
    angular
        .module('TrendTv')
        .controller('ProfileEditController', ProfileEditController);

    function ProfileEditController($routeParams, userService, $location, currentUser) {
        var model=this;

        model.userId=currentUser._id;

        function init() {
            userService.findUserById(model.userId)
                .then(function (user) {
                    model.user=user;

                }, function (err) {
                    model.err='Error occured. Try again later :(';
                });
        }

        init();

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
                    model.message = 'Updated the profile';
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