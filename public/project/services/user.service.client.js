(function () {
    angular
        .module('TrendTv')
        .factory('userService', userService);

    function userService($http) {

        var api={
            findUserByCredentials : findUserByCredentials,
            findUserByUsername : findUserByUsername,
            createUser : createUser,
            findUserById : findUserById,
        };
        return api;

        function findUserById(userId) {

            var url = '/api/project/user/'+userId;
            return $http.get(url)
                .then(function (response) {
                    var user = response.data;
                    return user;
                });

        }

        function findUserByCredentials(username, password) {

            var url = '/api/project/user?username='+username+'&password='+password;

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findUserByUsername(username) {

            var url = '/api/project/user?username='+username;

            return $http.get(url)
                .then(function(resp){
                    return resp.data;
                })

        }

        function createUser(user) {
            var url = '/api/project/user';
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

    }
})();