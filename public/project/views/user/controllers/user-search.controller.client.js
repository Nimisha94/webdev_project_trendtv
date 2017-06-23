(function () {
    angular
        .module('TrendTv')
        .controller('UserSearchController', UserSearchController);

    function UserSearchController(userService, $location, $routeParams, currentUser) {

        var model=this;
        //model.userId=$routeParams['userId']
        model.userId=currentUser._id;



        if(model.userId)
        {
            userService.findUserById(model.userId)
                .then(renderUser);
        }

        //event handlers
        model.redirectToSearchResults=redirectToSearchResults;
        model.logout = logout;

        function renderUser(user) {
            model.user=user;
        }

        function redirectToSearchResults(searchText) {
            console.log(model.search);
            if(typeof model.search === 'undefined')
            {
                $location.url('/search/' + searchText);
            }
            else if(model.search === 'user' || model.search === 'actor'){
                $location.url('/search/'+model.search+'/'+searchText);
            }
            /*else if(model.search === 'actor'){
                $location.url('/searchUser/' + searchText);
            }*/
            else if(model.search === 'tvseries') {
                $location.url('/search/' + searchText);
            }

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