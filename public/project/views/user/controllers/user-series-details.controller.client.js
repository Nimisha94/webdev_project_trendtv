(function () {
    angular
        .module('TrendTv')
        .controller('ViewSeriesController', ViewSeriesController);

    function ViewSeriesController(userService, SeriesService, CommentsService, $routeParams, $location, $route, currentUser) {

        var model = this;
        //model.userId = $routeParams['userId'];
        model.userId = currentUser._id;
        model.seriesId = $routeParams['seriesId'];
        model.comments=[];
        model.users=[];
        model.userIds=[];
        model.wishlistflag=false;
        model.watchedlistflag=false;

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

        //event handlers
        model.addToWishList=addToWishList;
        model.addToWatchedList=addToWatchedList;
        model.addedToWishList=addedToWishList;
        model.addedToWatchedList=addedToWatchedList;
        model.insertComment=insertComment;
        model.getNumber = getNumber;
        model.logout = logout;

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
                    model.message="Added to WatchedList";
                    $route.reload();
                }, function () {
                    model.message="Oops! Something went wrong :("
                });
        }

        function addToWishList() {
            userService.addToWishList(model.userId, model.seriesId)
                .then(function () {
                    model.message="Added to WishList";
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
            ///console.log(model.details);
        }

        function failSearchDetails() {
            //console.log('Failed search details')
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