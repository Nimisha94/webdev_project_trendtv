(function () {
    angular
        .module('TrendTv',['ngRoute'])

    .directive('errSrc', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        }
    })
    .directive("removeMe", function($rootScope) {
        return {
            link:function(scope,element,attrs)
            {
                element.bind("click",function(index) {
                    var i = $(this).index();
                    //element.remove();
                    $('#x'+(index+1)).hide();

                });
            }
        }

    });

}) ();
