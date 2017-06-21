(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchUserResultsController', UserSearchUserResultsController);

    function UserSearchUserResultsController($routeParams,$route,userService,SeriesService, $location) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = $routeParams['userId'];
        searchUsers(model.searchText);

        //event handlers
        model.searchUsers = searchUsers;
        model.redirectUser=redirectUser;
        model.unfollow=unfollow;
        model.follow=follow;

        userService.findUserById(model.userId)
            .then(renderUser, errorUser);

        function renderUser(user) {
            model.user=user;
        }

        function redirectUser(fId) {
            //userService.findUserById(fId)
            //    .then(renderUser, errorUser);
            var url = '/user/'+model.userId+'/finduser/'+fId;
            $location.url(url);
        }

        function searchUsers(searchText) {
            userService.findUsersByText(searchText)
                .then(successSearch, failSearch);
        }

        /*function getSeriesDetailsbyId(index) {
            //var seriesId =
            //console.log(index);
            //console.log(model.searchResults[index].id);
            $location.url('/user/'+model.userId+'/series/'+model.searchResults[index].id);
        }*/
        function successSearch(searchResultsArr) {
            console.log(searchResultsArr);
            for(var u in searchResultsArr)
            {
                searchResultsArr[u].followingCount=searchResultsArr[u].following.length;
                searchResultsArr[u].followerCount=searchResultsArr[u].followers.length;
            }
            model.searchResults = searchResultsArr;

        }
        function failSearch() {
            console.log('search failure');
        }

        function unfollow(fid){
            var index = model.user.following.indexOf(fid);

            for(var i=0;i<model.user.following.length;i++){
                if(model.user.following[i]===fid){

                    userService.deleteFromFollower(fid,model.userId)
                        .then(function () {
                            userService.deleteFollowingById(model.userId,fid)
                                .then(reRenderUser, errorUser);
                        })
                }
            }
        }

        function follow(fId){
            userService.addToFollower(fId, model.userId)
                .then(function () {
                    userService.addToFollowingById(model.userId, fId)
                        .then(reRenderUser, errorUser);
                })
        }

        function errorUser(user) {
            model.message="Oops! Something went wrong :("
        }

        function reRenderUser() {
            $route.reload();
            //var url = '/user/'+model.userId+'/following';
            /*userService.findUserById(model.userId)
                .then(renderUser, errorUser);*/

        }

    }

})();