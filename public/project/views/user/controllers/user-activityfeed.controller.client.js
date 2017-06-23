(function () {
    angular
        .module('TrendTv')
        .controller('ActivityFeedController', ActivityFeedController);

    function ActivityFeedController($routeParams,$location, $route, userService, PostsService, currentUser) {

        var model = this;
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.actors = [];
        model.posts = [];

        userService.findUserById(model.userId)
            .then(function (user) {
                model.user = user;
                var following = user.following;
                for(var f in following)
                {
                    PostsService.getPostsByActorId(following[f])
                        .then(function (posts) {
                            for(var p in posts)
                            {
                                model.posts.push(posts[p]);
                                userService.findUserById(posts[p].actorId)
                                    .then(function (user) {
                                        model.actors.push(user.username);
                                    });
                            }
                        });

                }
                console.log(model.actors);
            }, function (err) {
                model.err = 'Error fetching posts';
            });

        //event handlers
        model.like = like;
        model.dislike = dislike;
        model.logout = logout;

        function like(postId) {

            //add to likes
            PostsService.likePost(postId, model.userId)
                .then(function (status) {
                    $route.reload();
                }, function (err) {
                    model.err = 'Error occured. Try again later! :('
                });

            //remove from dislikes if present
            PostsService.getPostById(postId)
                .then(function (post) {
                    if(post.dislikes.indexOf(model.userId) > -1)
                    {
                        PostsService.removeFromDislike(postId, model.userId)
                            .then(function (status) {
                                $route.reload();
                            });
                    }
                }, function (err) {
                    model.err = 'Error occured. Try again later! :('
                });

        }

        function dislike(postId) {

            //add to dislikes
            PostsService.dislikePost(postId, model.userId)
                .then(function (status) {
                    $route.reload();
                }, function (err) {
                    model.err = 'Error occured. Try again later! :('
                });

            //remove from likes if present
            PostsService.getPostById(postId)
                .then(function (post) {
                    if(post.likes.indexOf(model.userId) > -1)
                    {
                        PostsService.removeFromLike(postId, model.userId)
                            .then(function (status) {
                                $route.reload();
                            });
                    }
                }, function (err) {
                    model.err = 'Error occured. Try again later! :('
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