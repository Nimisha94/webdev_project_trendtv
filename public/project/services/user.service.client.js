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
            addToFollowingById : addToFollowingById,
            deleteFollowingById : deleteFollowingById,
            addComment : addComment,
            deleteFromFollower : deleteFromFollower,
            addToFollower : addToFollower,
            deleteWishlistById : deleteWishlistById,
            deleteWatchlistById : deleteWatchlistById,
            findUsersByText :findUsersByText,
            findActorsByText : findActorsByText,
            updateUser: updateUser,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            login : login,
            loggedIn : loggedIn,
            logout : logout,
            register : register
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
            var url = '/api/project/user/'+userId+'/watchedlist/comment/'+seriesId;

            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addToWishList(userId, seriesId) {
            var url = '/api/project/user/'+userId+'/wishlist/comment/'+seriesId;

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

        function deleteFromFollower(userId, followerId) {
            var url = '/api/project/user/'+userId+'/follower/'+followerId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function addToFollower(userId, followerId) {
            var url = '/api/project/user/'+userId+'/follower/'+followerId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWishlistById(userId, seriesId) {
            var url = '/api/project/user/'+userId+'/wishlist/'+seriesId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function deleteWatchlistById(userId, seriesId) {
            var url = '/api/project/user/'+userId+'/watchlist/'+seriesId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                })
        }
        
        function findUsersByText(searchText) {
            var url = '/api/project/user/search/'+searchText;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findActorsByText(searchText) {
            var url = '/api/project/user/searchActor/'+searchText;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(user) {
            var url = '/api/project/user/'+user._id;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = '/api/project/users';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = '/api/project/user/'+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = '/api/login';
            var credentials ={
                username: username,
                password: password
            };
            return $http.post(url,credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedIn(){
            var url = '/api/loggedIn';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function logout() {
            var url = '/api/logout';
            return $http.post(url    )
                .then(function (response) {
                    return response.data;
                });
        }

        function register(userObj) {
            var url = '/api/register';
            return $http.post(url,userObj)
                .then(function (response) {
                    return response.data;
                })

        }
    }
})();