 (function () {
    angular
        .module('TrendTv')
        .factory('CommentsService', CommentsService);

    function CommentsService($http) {

        var api ={
            getCommentById : getCommentById,
            updateComment : updateComment,
            getCommentsBySeriesId : getCommentsBySeriesId,
            createComment:createComment,
            findAllComments: findAllComments,
            deleteComment: deleteComment
        };

        return api;

       function createComment(comment) {
           var url = '/api/project/comment';
           return $http.post(url, comment)
               .then(function (response) {
                   var comment = response.data;
                   return comment;
               });
       }

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
           console.log(comment);
           return $http.put(url, comment)
               .then(function (response) {
                   var comment = response.data;
                   return comment;
               });
       }

       function getCommentsBySeriesId(seriesId) {
           var url = '/api/project/comment/comment/'+seriesId;
           return $http.get(url)
               .then(function (response) {
                   var comments = response.data;
                   return comments;
               });
       }

       function findAllComments() {
           var url = '/api/project/comments';
           return $http.get(url)
               .then(function (response) {
                   var comments = response.data;
                   return comments;
               });
       }

       function deleteComment(commentId) {
           var url = '/api/project/comment/'+commentId;
           return $http.delete(url)
               .then(function (response) {
                   return response.data;
               });
       }
    }
})();