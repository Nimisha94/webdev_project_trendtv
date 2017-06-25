(function () {
    angular
        .module('TrendTv')
        .controller('PostsController', PostsController)

    function PostsController(PostsService, userService, $routeParams, $route, currentUser, $location, $mdDialog, $mdSidenav) {

        var model = this;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.disableFlag = false;

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
        model.logout = logout;
        model.showEditBox = showEditBox;

        function showEditBox(post, ev) {
            //console.log('yes');
            model.disableFlag = true;
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'views/post/templates/post-edit.view.client.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: model.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    items: [],
                    flag: '',
                    post: post
                }

            })
            .then(function(answer) {
                model.status = 'You said the information was "' + answer + '".';
            });
        }

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

        function showLikes(postId, ev) {
            //console.log(postId);
            model.disableFlag = true;
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
                    model.likeArr = users;
                    //console.log(users);
                });

            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'views/post/templates/dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: model.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    items: users,
                    flag: 'l',
                    post: {}
                }

            })
                .then(function(answer) {
                    model.status = 'You said the information was "' + answer + '".';
                });
            //console.log(users);
        }

        function showDislikes(postId,ev) {
            //console.log(postId);
            model.disableFlag = true;
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
                    model.disLikeArr = users;
                });
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'views/post/templates/dialog1.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                fullscreen: model.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    items: users,
                    flag: 'd',
                    post: {}
                }

            })
                .then(function(answer) {
                    model.status = 'You said the information was "' + answer + '".';
                    console.log(answer);
                    console.log(model.disableFlag);
                    model.disableFlag = false;
                    $route.reload();
                }, function () {
                    $route.reload();
                });
            //console.log(users);
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function DialogController($mdDialog,items, flag, post, $route, PostsService) {

            var vm = this;

            vm.items = items;

            vm.flag = flag;

            vm.post = post;

            vm.hide = function() {
                $mdDialog.hide();
            };

            vm.cancel = function() {
                $mdDialog.cancel();
                $route.reload();
            };

            vm.answer = function(answer) {
                $mdDialog.hide(answer);
                $route.reload();
                console.log(answer);
            };

            vm.updatePost = function() {
                PostsService.updatePost(vm.post)
                    .then(function (status) {
                        $mdDialog.hide(status);
                        $route.reload();
                        console.log(status);
                    }, function (err) {
                        model.err = 'Error updating the post';
                    });
            }
        }
    }

})();