(function () {
    angular
        .module('TrendTv')
        .factory('PostsService', PostsService);


    function PostsService($http) {

        var api ={
            getPostsByActorId: getPostsByActorId,
            createPost: createPost,
            getPostById: getPostById,
            updatePost: updatePost,
            likePost: likePost,
            removeFromDislike: removeFromDislike,
            dislikePost: dislikePost,
            removeFromLike: removeFromLike,
            findAllPosts: findAllPosts,
            deletePost: deletePost
        };

        return api;

        function getPostsByActorId(actorId) {
            var url = '/api/project/actor/post/'+actorId;
            return $http.get(url)
                .then(function (response) {
                    var posts = response.data;
                    return posts;
                });
        }

        function createPost(post) {
            var url = '/api/project/post';
            return $http.post(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function getPostById(postId) {
            var url = '/api/project/post/'+postId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePost(post) {
            var url = '/api/project/post/'+post._id;
            return $http.put(url, post)
                .then(function (response) {
                    return response.data;
                });
        }

        function likePost(postId, userId) {
            var url = '/api/project/like/add/post/'+postId+'/user/'+userId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeFromDislike(postId, userId) {
            var url = '/api/project/dislike/remove/post/'+postId+'/user/'+userId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function dislikePost(postId, userId) {
            var url = '/api/project/dislike/add/post/'+postId+'/user/'+userId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function removeFromLike(postId, userId) {
            var url = '/api/project/like/remove/post/'+postId+'/user/'+userId;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllPosts() {
            var url = '/api/project/posts';
            return $http.get(url)
                .then(function (response) {
                    var comments = response.data;
                    return comments;
                });
        }

        function deletePost(postId) {
            var url = '/api/project/post/'+postId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();