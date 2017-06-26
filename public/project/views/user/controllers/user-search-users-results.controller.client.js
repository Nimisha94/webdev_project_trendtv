(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchUserResultsController', UserSearchUserResultsController);

    function UserSearchUserResultsController($routeParams,$route,userService,SeriesService, $location, currentUser) {

        var model = this;
        var tmdbId = null;
        model.searchText = $routeParams['searchText'];
        model.userId = currentUser._id;
        var role = $routeParams['searchRole'];

        function init() {
            if(role === 'user') {
                searchUsers(model.searchText);
            }
            else if (role === 'actor'){
                searchActors(model.searchText)
            }

            userService.findUserById(model.userId)
                .then(renderUser, errorUser);
        }

        init();

        //event handlers
        model.redirectUser=redirectUser;
        model.unfollow=unfollow;
        model.follow=follow;
        model.logout = logout;

        function renderUser(user) {
            model.user=user;
        }

        function redirectUser(fId) {
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