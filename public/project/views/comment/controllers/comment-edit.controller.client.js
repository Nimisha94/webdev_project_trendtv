(function () {
    angular
        .module('TrendTv')
        .controller('EditCommentController', EditCommentController);

    function EditCommentController(CommentsService, SeriesService, $location, $routeParams) {

        var model = this;
        model.userId =$routeParams['userId'];
        model.commentId = $routeParams['commentId'];

        function init() {
            CommentsService.getCommentById(model.commentId)
                .then(renderComment, error);
        }

        init();

        //event handlers
        model.updateComment=updateComment;
        model.logout = logout;

        function updateComment() {
            var c={
                _id:model.comment._id,
                userId:model.comment.userId,
                seriesId:model.comment.seriesId,
                comment:model.comment.comment
            }
            CommentsService.updateComment(c)
                .then(function () {
                    $location.url('/comments');
                });

        }

        function renderComment(comment) {
            model.comment=comment;

            SeriesService.getSearchDetailsById(comment.seriesId)
                .then(function (series) {
                    model.seriesName=series.name;
                    });
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
    }
})();