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
            addToWishList : addToWishList,
            addToWatchedList : addToWatchedList,
            getWishListByUserId :getWishListByUserId,
            getWatchedListByUserId : getWatchedListByUserId,
            deleteFollowingById : deleteFollowingById,
<<<<<<< HEAD
            addToFollowingById : addToFollowingById
=======
            addComment : addComment
>>>>>>> 2ba850748b9110f1a110c825900b12cc4315a646
        };
        return api;

        function addComment(userId, commentId) {
            var url = '/api/project/user/'+userId+'/comment/'+commentId;

            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function getWatchedListByUserId(userId) {
            var url = '/api/project/user/'+userId+'/watchedlist';

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getWishListByUserId(userId) {
            var url = '/api/project/user/'+userId+'/wishlist';

            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addToWatchedList(userId, seriesId) {
            var url = '/api/project/user/'+userId+'/watchedlist/series/'+seriesId;

            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addToWishList(userId, seriesId) {
            var url = '/api/project/user/'+userId+'/wishlist/series/'+seriesId;

            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

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

        function deleteFollowingById(userId, fid) {
            var url = '/api/project/user/'+userId+'/following/'+fid;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addToFollowingById(userId, fId) {
            var url = '/api/project/user/'+userId+'/following/'+fId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }






    }
})();