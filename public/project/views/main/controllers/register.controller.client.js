(function () {
    angular
        .module('TrendTv')
        .controller('RegisterController', RegisterController);
    
    function RegisterController($location, userService) {
        var model = this;

        //event handlers
        model.register = register;

        function register(username, password, verpwd, email, firstname, lastname) {
            if(typeof username==='undefined' || username === '')
            {
                model.err='Username is required';
            }
            else if(typeof password==='undefined' || typeof verpwd==='undefined')
            {
                model.err='Password is required';
            }
            else if(password!==verpwd)
            {
                model.err='Password do not match';
            }
            else  if(password==='')
            {
                model.err='Password should not be empty';
            }
            else if(typeof email==='undefined' || email==='')
            {
                model.err='Email is required';
            }
            else if(typeof firstname==='undefined' || firstname==='')
            {
                model.err='Firstname is required';
            }
            else if(typeof lastname==='undefined' || lastname==='')
            {
                model.err='Lastname is required';
            }
            else {
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
                                .register(user)
                                .then(userCreated, userError);

                            function userCreated(user) {

                                $location.url('/profileEdit');
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
    }
})();