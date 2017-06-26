(function () {
    angular
        .module('TrendTv')
        .controller('LoginController', LoginController);
    
    function LoginController($location, userService) {
        var model=this;


        //event handlers
        model.login=login;


        function login(username, password) {
            if(typeof username==='undefined' && typeof password==='undefined')
            {
                model.message='Username and password are required';
            }
            else if(typeof username==='undefined')
            {
                model.message='Username required';
            }
            else if(typeof password==='undefined')
            {
                model.message='Password required';
            }
            else {
                userService.login(username, password)
                    .then(loginUser, loginError);
            }

            function loginUser(user) {
                if (user === null) {
                    model.message = 'Invalid Credentials'
                }
                else if(user.role === 'user') {
                    //$location.url('/home/user/' + user._id);
                    $location.url('/');
                }
                else if(user.role === 'admin') {
                    $location.url('/admin');
                }
                else if(user.role === 'actor'){
                    $location.url('/');
                }
            }

            function loginError(user) {
                model.message="Invalid Credentials";
            }

        }
    }
})();