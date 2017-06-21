(function () {
    angular
        .module('TrendTv')
        .controller('LoginController', LoginController);
    
    function LoginController($location, userService) {
        var model=this;

        //event handlers
        model.login=login;

        function login(username, password) {
            userService.findUserByCredentials(username, password)
                .then(loginUser, loginError);

            function loginUser(user) {
                if (user === null) {
                    model.message = 'Invalid Credentials'
                }
                else if(user.role === 'user') {
                    $location.url('/home/user/' + user._id);
                }
                else if(user.role === 'admin') {
                    $location.url('/admin');
                }
                else if(user.role === 'actor'){
                    $location.url('/home/user/' + user._id);
                }


            }

            function loginError(user) {
                model.message="Error!!";
            }

        }
    }
})();