(function () {
    angular
        .module('TrendTv')
        .controller('RegisterController', RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;

        //event handlers
        model.register = register;

        function register(username, password, verpwd, email, firstname, lastname) {
            if (typeof firstname === 'undefined' || typeof lastname === 'undefined' || typeof username === 'undefined' || typeof password === 'undefined' || typeof verpwd === 'undefined') {
                model.err = 'Please make sure to fill all the fields';
                return;
            }
            var user = null;
            userService.findUserByUsername(username)
                .then(renderUser, userError);


            function renderUser(user) {

                if (user === null || typeof user === 'undefined') {

                    if (password === verpwd) {
                        user = {
                            username: username,
                            password: password,
                            email: email,
                            firstName : firstname,
                            lastName : lastname,
                            role: model.role
                        };
                        userService
                            .createUser(user)
                            .then(userCreated, userError);

                        function userCreated(user) {

                            $location.url('/user/' + user._id);
                        }
                    }
                    else {
                        model.err = 'Please make sure that passwords match !'
                    }
                }
                else model.err = 'User ' + user.username + ' already exists. Try another username !!';

            }

            function userError(user) {
                model.err = 'Error';


            }
        }
    }
})();