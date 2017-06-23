(function () {
    angular
        .module('TrendTv')
        .controller('CommentsController', CommentsController);

    function CommentsController(userService, CommentsService, SeriesService, $location, $routeParams, currentUser) {

        var model = this;
        model.comments=[];

        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        userService.findUserById(model.userId)
            .then(renderUser, error);

        //event handlers
        model.logout = logout;

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

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }
    }
})();