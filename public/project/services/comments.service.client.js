(function () {
    angular
        .module('TrendTv')
        .factory('CommentsService', CommentsService);

    function CommentsService($http) {

        var api ={
            getCommentById : getCommentById,
            updateComment : updateComment
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

       function updateComment(comment) {
           var url = '/api/project/comment/'+comment._id;
           return $http.put(url, comment)
               .then(function (response) {
                   var comment = response.data;
                   return comment;
               });
       }
    }
})();