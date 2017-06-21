(function () {
    angular
        .module('TrendTv')
        .controller('EditPostController', EditPostController);

    function EditPostController($routeParams, $location, PostsService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.postId = $routeParams['postId'];

        PostsService.getPostById(model.postId)
            .then(function (post) {
                model.post = post;
            }, function (err) {
                model.err = 'Error editing the post';
            });

        //event handlers
        model.updatePost = updatePost;

        function updatePost() {
            PostsService.updatePost(model.post)
                .then(function (status) {
                    $location.url('/user/'+model.userId+'/posts');
                }, function (err) {
                    model.err = 'Error updating the post';
                });
        }
    }
})();