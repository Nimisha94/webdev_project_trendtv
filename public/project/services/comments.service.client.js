(function () {
    angular
        .module('TrendTv')
        .factory('CommentsService', CommentsService);

    function CommentsService($http) {

        var api ={
            getCommentById : getCommentById
        };

        return api;

       function getCommentById(commentId) {

           var url = '/api/project/comment/'+commentId;
           return $http.get(url)
               .then(function (response) {
                   var comment = response.data;
                   return comment;
               });
       }
    }
})();