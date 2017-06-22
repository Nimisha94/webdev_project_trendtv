(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchUserResultsController', UserSearchUserResultsController);

    function UserSearchUserResultsController($routeParams,$route,userService,SeriesService, $location) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = $routeParams['userId'];
        var role = $location.path().split('/')[3];
        //console.log(role);

        if(role === 'searchUser') {
            searchUsers(model.searchText);
        }
        else if (role === 'searchActor'){
            searchActors(model.searchText)
        }
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
            var url = '/finduser/'+fId;
            $location.url(url);
        }

        function searchUsers(searchText) {
            userService.findUsersByText(searchText)
                .then(successSearch, failSearch);
        }
        function searchActors(searchText) {
            userService.findActorsByText(searchText)
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
            var index = -1;
            for(var u in searchResultsArr)
            {
                if(searchResultsArr[u]._id ===model.userId ){
                    index = u;
                    console.log(index);
                }
                searchResultsArr[u].followingCount=searchResultsArr[u].following.length;
                searchResultsArr[u].followerCount=searchResultsArr[u].followers.length;

            }
            if(index !== -1)
            {
                searchResultsArr.splice(index,1);
            }
            model.searchResults = searchResultsArr;
            console.log(model.searchResults);

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