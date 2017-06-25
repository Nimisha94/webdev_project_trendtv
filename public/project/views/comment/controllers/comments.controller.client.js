(function () {
    angular
        .module('TrendTv')
        .controller('CommentsController', CommentsController);

    function CommentsController(userService, CommentsService, SeriesService, $location, $routeParams, currentUser, $mdDialog) {

        var model = this;
        model.comments=[];
        model.disableFlag = false;

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        userService.findUserById(model.userId)
            .then(renderUser, error);

        //event handlers
        model.logout = logout;
        model.EditCommentBox = EditCommentBox;

        function renderUser(user) {
            model.user=user;
            for(var c in model.user.comments)
            {
                CommentsService.getCommentById(model.user.comments[c])
                    .then(renderComments, error);
            }
        }

        function renderComments(comment) {
            SeriesService.getSearchDetailsById(comment.seriesId)
                .then(function (series) {
                    comment.seriesName=series.name;
                    comment.poster = series.posterPath
                    model.comments.push(comment);
                })

        }


        function error() {
            model.message="Oops! Something went wrong :("
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function EditCommentBox(comment, ev) {
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