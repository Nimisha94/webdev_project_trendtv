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
            else {
                $location.url('/user/' + model.userId + '/search/' + searchText);
            }

    }


    }
})();