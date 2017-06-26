(function () {
    angular
        .module('TrendTv')
        .controller('ViewSeriesController', ViewSeriesController);

    function ViewSeriesController(userService, SeriesService, CommentsService, $routeParams, $location, $route, currentUser, $mdDialog) {

        var model = this;
        model.userId = currentUser._id;
        model.seriesId = $routeParams['seriesId'];
        model.comments=[];
        model.users=[];
        model.userIds=[];
        model.wishlistflag=false;
        model.watchedlistflag=false;
        model.disableFlag = false;

        function init() {
            userService.findUserById(model.userId)
                .then(renderUser);


            SeriesService.getSearchDetailsById(model.seriesId)
                .then(successSearchDetails, failSearchDetails);

            CommentsService.getCommentsBySeriesId(model.seriesId)
                .then(renderComments);

            userService.getWishListByUserId(model.userId)
                .then(function (wishlist) {
                    //console.log(wishlist);
                    if(wishlist.indexOf(model.seriesId)>=0)
                    {
                        model.wishlistflag=true;
                    }
                });

            userService.getWatchedListByUserId(model.userId)
                .then(function (watchedlist) {
                    //console.log(watchedlist);
                    if(watchedlist.indexOf(model.seriesId)>=0)
                    {
                        model.watchedlistflag=true;
                    }
                });
        }

        init();

        //event handlers
        model.addToWishList=addToWishList;
        model.addToWatchedList=addToWatchedList;
        model.addedToWishList=addedToWishList;
        model.addedToWatchedList=addedToWatchedList;
        model.insertComment=insertComment;
        model.getNumber = getNumber;
        model.logout = logout;
        model.editCommentBox = editCommentBox;

        function getNumber(number) {
            var arr = [];
            for(var i=0;i<number;i++)
            {
                arr.push(i);
            }
            return arr;
        }

        function insertComment(comment) {
                var c={
                    userId : model.userId,
                    seriesId : model.seriesId,
                    comment: comment
                };
                CommentsService.createComment(c)
                    .then(function (comment) {
                        userService.addComment(model.userId,comment._id)
                            .then(function (c) {
                                $route.reload();
                            });
                    });
        }

        function addedToWatchedList() {
            model.message="Already present in WatchedList";
        }

        function addedToWishList() {
            model.message="Already present in WishList";
        }

        function addToWatchedList() {
            userService.addToWatchedList(model.userId, model.seriesId)
                .then(function () {
                    $route.reload();
                }, function () {
                    model.message="Oops! Something went wrong :("
                });
        }

        function addToWishList() {
            userService.addToWishList(model.userId, model.seriesId)
                .then(function () {
                    $route.reload();
                }, function () {
                    model.message="Oops! Something went wrong :("

                })
        }

        function renderComments(comments) {
            model.comments=comments;
            for(var c in comments)
            {
                console.log(comments[c].userId);
                userService.findUserById(comments[c].userId)
                    .then(function (user) {
                        console.log('lll');
                        console.log(user);
                        model.users.push(user.username);
                    });
            }
        }

        function renderUser(user) {
            model.user = user;
        }

        function successSearchDetails(details) {
            model.details = details;
        }

        function failSearchDetails() {
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function editCommentBox(comment, ev) {
            console.log('yes');
            model.disableFlag = true;
            $mdDialog.show({
                controller: DialogController,
                controllerAs: 'vm',
                templateUrl: 'views/comment/templates/comment-edit.view.client.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: model.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    comment: comment
                }

            })
                .then(function(answer) {
                    model.status = 'You said the information was "' + answer + '".';
                }, function () {
                    $route.reload();
                });
        }

        function DialogController($mdDialog, comment, $route, CommentsService, SeriesService) {

            var vm = this;

            vm.comment = comment;

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


            SeriesService.getSearchDetailsById(comment.seriesId)
                .then(function (series) {
                    vm.seriesName=series.name;
                });

            function error() {
                model.message="Oops! Something went wrong :("
            }

            vm.updateComment = function() {
                var c={
                    _id:vm.comment._id,
                    userId:vm.comment.userId,
                    seriesId:vm.comment.seriesId,
                    comment:vm.comment.comment
                }
                CommentsService.updateComment(c)
                    .then(function () {
                        $mdDialog.hide(status);
                        $route.reload();
                        console.log(status);
                    });

            }
        }

    }
})();