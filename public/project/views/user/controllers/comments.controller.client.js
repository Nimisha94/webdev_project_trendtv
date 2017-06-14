(function () {
    angular
        .module('TrendTv')
        .controller('CommentsController', CommentsController);

    function CommentsController(userService, CommentsService, SeriesService, $location, $routeParams) {

        var model = this;
        model.comments=[];

        model.userId = $routeParams['userId'];
        userService.findUserById(model.userId)
            .then(renderUser, error);

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
                    model.comments.push(comment);
                })

        }


        function error() {
            model.message="Oops! Something went wrong :("
        }
    }
})();