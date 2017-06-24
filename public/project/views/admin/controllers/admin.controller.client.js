(function () {
    angular
        .module('TrendTv')
        .controller('AdminController', AdminController);

    function AdminController($location, $routeParams, userService, CommentsService, SeriesService, PostsService, $route, currentUser) {

        var model=this;
        model.flag=false;
        model.cflag=false;
        model.usersflag=true;
        model.commentsflag=false;
        model.postsflag=false;
        model.commentusersArr=[];
        model.commentseriesArr=[];
        model.postactorsArr=[];
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.username='admin';
        model.currentNavItem = 'users';

        function init() {
            userService.findAllUsers()
                .then(function (users) {
                    model.users=users;
                }, function (err) {
                    model.err='Error fetching all the users';
                });

            CommentsService.findAllComments()
                .then(function (comments) {
                    model.comments = comments;
                    for(var c in comments)
                    {
                        userService.findUserById(comments[c].userId)
                            .then(function (user) {
                                model.commentusersArr.push(user.username);
                            }, function (err) {
                                model.err = 'Error!!';
                            });

                        SeriesService.getSearchDetailsById(comments[c].seriesId)
                            .then(function (series) {
                                model.commentseriesArr.push(series.name);
                            }, function (err) {
                                model.err = 'Error!!';
                            });
                    }
                }, function (err) {
                    model.err = 'Error fetching all the comments';
                });

            PostsService.findAllPosts()
                .then(function (posts) {
                    model.posts = posts;
                    for(var c in posts)
                    {
                        userService.findUserById(posts[c].actorId)
                            .then(function (user) {
                                model.postactorsArr.push(user.username);
                            }, function (err) {
                                model.err = 'Error!!';
                            });
                    }
                }, function (err) {
                    model.err = 'Error fetching all the comments';
                });
        }

        init();

        //event handlers
        model.deleteUser = deleteUser;
        model.getUser = getUser;
        model.updateUser = updateUser;
        model.createUser = createUser;
        model.showUsers = showUsers;

        model.showComments = showComments;
        model.getComment = getComment;
        model.updateComment = updateComment;
        model.deleteComment = deleteComment;

        model.showPosts = showPosts;
        model.getPost = getPost;
        model.updatePost = updatePost;
        model.deletePost = deletePost;

        model.logout = logout;

        function deleteComment(commentId) {
            CommentsService.deleteComment(commentId)
                .then(function (status) {
                    init();
                    // $route.reload();
                }, function (err) {
                    model.err = 'Error deleting comment';
                });
        }

        function deletePost(postId) {
            PostsService.deletePost(postId)
                .then(function (status) {
                    init();
                    // $route.reload();
                }, function (err) {
                    model.err = 'Error deleting comment';
                });
        }

        function updateComment() {
            console.log(model.comment);
            var c = {
                _id: model.comment._id,
                userId : model.comment.userId,
                seriesId: model.comment.seriesId,
                comment: model.commentText
            };
            CommentsService.updateComment(c)
                .then(function (status) {
                    //init();
                    $route.reload();
                }, function (err) {
                    model.err = 'Error updating comment';
                })
        }

        function updatePost() {
            var c = {
                _id: model.post._id,
                actorId : model.post.actorId,
                actorName : model.actorname,
                title: model.ptitle,
                body: model.postText
            };
            PostsService.updatePost(c)
                .then(function (status) {
                    //init();
                    $route.reload();
                }, function (err) {
                    model.err = 'Error updating comment';
                })
        }

        function getComment(comment, username, seriesname, commentText) {
            model.cflag = true;
            model.comment = comment;
            model.cusername=username;
            model.seriesname=seriesname;
            model.commentText=commentText;
        }

        function getPost(post, actorname, title, body) {
            model.pflag = true;
            model.post = post;
            model.actorname=actorname;
            model.ptitle=title;
            model.postText=body;
        }


        function showUsers() {
            model.usersflag=true;
            model.commentsflag=false;
            model.postsflag=false;
        }

        function showComments() {
            model.commentsflag = true;
            model.usersflag = false;
            model.postsflag=false;
        }

        function showPosts() {
            model.postsflag = true;
            model.usersflag = false;
            model.commentsflag=false;
        }

        function deleteUser(userId) {
            userService.deleteUser(userId)
                .then(function (status) {
                    $route.reload();
                }, function (err) {
                    model.err='Error deleting the user';
                });
        }

        function getUser(userId) {
            model.flag = true;
            userService.findUserById(userId)
                .then(function (user) {
                    model.user = user;
                }, function (err) {
                    model.err = 'Error in fetching the user';
                });
        }

        function updateUser() {
            userService.updateUser(model.user)
                .then(function (st) {
                    $route.reload();
                }, function (err) {
                    model.err = 'Error updating the user';
                });
        }

        function createUser() {
            userService.createUser(model.user)
                .then(function (user) {
                    $route.reload();
                }, function (err) {
                    model.err = 'Error creating the user';
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