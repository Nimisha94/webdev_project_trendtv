(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchController', UserSearchController);

    function UserSearchController(userService, $location, $routeParams) {

        var model=this;
        model.userId=$routeParams['userId'];


        userService.findUserById(model.userId)
            .then(renderUser);

        //event handlers
        model.redirectToSearchResults=redirectToSearchResults;

        function renderUser(user) {
            model.user=user;
        }

        function redirectToSearchResults(searchText) {
            console.log(model.search);
            if(model.search === 'user'){
                $location.url('/user/' + model.userId + '/searchUser/' + searchText);
            }
            if(model.search === 'actor'){
                $location.url('/user/' + model.userId + '/searchActor/' + searchText);
            }
            else if(model.search === 'tvseries') {
                $location.url('/user/' + model.userId + '/search/' + searchText);
            }

    }


    }
})();