(function () {
    angular
        .module('TrendTv')
        .controller('ViewSeriesController', ViewSeriesController);

    function ViewSeriesController(userService, SeriesService, CommentsService, $routeParams, $location, $route) {

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

        userService.getWishListByUserId(model.userId)
            .then(function (wishlist) {
                console.log(wishlist);
                if(wishlist.indexOf(model.seriesId)>=0)
                {
                    model.wishlistflag=true;
                }
            });

        userService.getWatchedListByUserId(model.userId)
            .then(function (watchedlist) {
                console.log(watchedlist);
                if(watchedlist.indexOf(model.seriesId)>=0)
                {
                    model.watchedlistflag=true;
                }
            });

        //event handlers
        model.addToWishList=addToWishList;
        model.addToWatchedList=addToWatchedList;
        model.addedToWishList=addedToWishList;
        model.addedToWatchedList=addedToWatchedList;
        model.insertComment=insertComment;

        function insertComment(comment) {
            var c={
                userId : model.userId,
                seriesId : model.seriesId,
                comment: comment
            }
            CommentsService.createComment(c)
                .then(function (comment) {
                    userService.addComment(model.userId,comment._id)
                    $route.reload();
                })
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
                    model.message="Added to WatchedList";
                    // to be redirected to watchedlist page
                    $location.url="";
                }, function () {
                    model.message="Oops! Something went wrong :("
                })

        }

        function addToWishList() {
            userService.addToWishList(model.userId, model.seriesId)
                .then(function () {
                    model.message="Added to WishList";
                    // to be redirected to wishlist page
                    $location.url="";
                }, function () {
                    model.message="Oops! Something went wrong :("
                })

        }

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