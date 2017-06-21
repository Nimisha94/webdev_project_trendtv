(function () {
    angular
        .module('TrendTv')
        .controller('PostsController', PostsController);

    function PostsController(PostsService, userService, $routeParams, $route) {

        var model = this;

        model.userId = $routeParams['userId'];

        userService.findUserById(model.userId)
            .then(function (user) {
                model.user = user;
            });

        PostsService.getPostsByActorId(model.userId)
            .then(function (posts) {
                model.posts = posts;
            }, function (err) {
                model.err = 'Error fetching the posts';
            });

        //event handlers
        model.createPost = createPost;
        model.showLikes = showLikes;
        model.showDislikes = showDislikes;

        function createPost(title, post) {
            var p ={
                actorId: model.userId,
                actorName: model.user.username,
                title: title,
                body: post
            };
            PostsService.createPost(p)
                .then(function (status) {
                    $route.reload();
                }, function (err) {
                    model.err = 'Error creating the post';
                });
        }

        function showLikes(postId) {
            //console.log(postId);
            var users = [];
            PostsService.getPostById(postId)
                .then(function (post) {
                    for(var u in post.likes)
                    {
                        userService.findUserById(post.likes[u])
                            .then(function (user) {
                                users.push(user);
                            });
                    }
                    //console.log(users);
                });
            //console.log(users);
        }

        function showDislikes(postId) {
            //console.log(postId);
            var users = [];
            PostsService.getPostById(postId)
                .then(function (post) {
                    for(var u in post.dislikes)
                    {
                        userService.findUserById(post.dislikes[u])
                            .then(function (user) {
                                users.push(user);
                            });
                    }
                    //console.log(users);
                });
            //console.log(users);
        }
    }
})();