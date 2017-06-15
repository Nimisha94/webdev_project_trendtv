(function () {
    angular
        .module('TrendTv')
        .controller('ViewSeriesController', ViewSeriesController);

    function ViewSeriesController(userService, SeriesService, CommentsService, $routeParams, $location) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.seriesId = $routeParams['seriesId'];
        model.comments=[];
        model.users=[];

        userService.findUserById(model.userId)
            .then(renderUser);


        SeriesService.getSearchDetailsById(model.seriesId)
            .then(successSearchDetails, failSearchDetails);

        CommentsService.getCommentsBySeriesId(model.seriesId)
            .then(renderComments);

        function renderComments(comments) {
            model.comments=comments;
            for(var c in comments)
            {
                userService.findUserById(comments[c].userId)
                    .then(function (user) {
                        model.users.push(user.username);
                    });
            }
        }

        function renderUser(user) {
            model.user = user;
        }

        function successSearchDetails(details) {
            model.details = details;
            console.log(model.details);
        }

        function failSearchDetails() {
            console.log('Failed search details')
        }
    }
})();