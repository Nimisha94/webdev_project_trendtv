(function () {
    angular
        .module('TrendTv')
        .controller('EditPostController', EditPostController);

    function EditPostController($routeParams, $location, PostsService, currentUser) {

        var model = this;
        model.userId = currentUser._id;
        model.postId = $routeParams['postId'];

        function init() {
            PostsService.getPostById(model.postId)
                .then(function (post) {
                    model.post = post;
                }, function (err) {
                    model.err = 'Error editing the post';
                });
        }

        init();

        //event handlers
        model.updatePost = updatePost;
        model.logout = logout;

        function updatePost() {
            PostsService.updatePost(model.post)
                .then(function (status) {
                    $location.url('/posts');
                }, function (err) {
                    model.err = 'Error updating the post';
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