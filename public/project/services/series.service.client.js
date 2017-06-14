(function () {
    angular
        .module('TrendTv')
        .factory('SeriesService', SeriesService);

    function SeriesService($http) {

        var api ={
            searchSeries: searchSeries,
            getSearchDetailsById:getSearchDetailsById,
            getTrendingSeriesIds : getTrendingSeriesIds,
            getTrendingImages : getTrendingImages
            //getTracktIdbySeriesName: getTracktIdbySeriesName
        };

        return api;

        function getTrendingImages(ids) {
            var imgpath=[];
            for(var i in ids)
            {
                var url = "https://api.themoviedb.org/3/tv/"+ids[i]+"?api_key=5a57d87cef01b95a12c3ca8862bf24f7&language=en-US";
                getTrendingImage(url)
                    .then(function (data) {
                        var obj={
                            poster_path : data.poster_path,
                            name: data.original_name,
                            rating: data.vote_average,
                            description: data.overview
                        };
                        imgpath.push(obj);
                    })
                //console.log(details);
            }
            //console.log('hai');
            //console.log(imgpath);
            return imgpath;
        }

        function getTrendingImage(url) {
            return $http.get(url)
                .then(renderSearchDetails);

        }

        function getTrendingSeriesIds() {
            var url = 'https://api.trakt.tv/shows/trending';
            return $http({method: 'GET', url:url, headers: {'trakt-api-key':'8ffe7e12ccdefbb0864f59a0a49faae085121ca35c09b6eb663cd4072788e509', 'trakt-api-version':2, 'Content-Type': 'application/json'}})
                .then(retrieveTrendingIds);
        }

        function retrieveTrendingIds(response) {
            var objarr=response.data;
            var ids=[];
            for(var i=0;i<9;i++)
            {
                ids.push(objarr[i].show.ids.tmdb);
            }
            return ids;
        }

        function searchSeries(searchText) {
            var url1 = 'https://api.themoviedb.org/3/tv/1668?api_key=5a57d87cef01b95a12c3ca8862bf24f7';
            var urlTmdb = 'https://api.themoviedb.org/3/search/tv?api_key=5a57d87cef01b95a12c3ca8862bf24f7&language=en-US&query='+searchText;
            var url2 = 'https://api.trakt.tv/search/show?query=tron&trakt-api-key=8ffe7e12ccdefbb0864f59a0a49faae085121ca35c09b6eb663cd4072788e509&trakt-api-version=2&Content-Type=application/json';
            var url3 = 'https://api.trakt.tv/search/show?query='+searchText;
            /*return $http({method: 'GET', url:url3, headers: {'trakt-api-key':'8ffe7e12ccdefbb0864f59a0a49faae085121ca35c09b6eb663cd4072788e509', 'trakt-api-version':2, 'Content-Type': 'application/json'}})
                .then(function (response) {
                    return response.data;
                })*/
            return $http.get(urlTmdb)
                .then(renderSearch);
                    /*function (response) {
                    console.log(response.data);
                    renderSearch(response.data);
                    return response.data;
                })*/
        }

        function getSeriesbyName(searchText) {

            /*var url = 'https://api.trakt.tv/search/show?query='+searchText;
            return $http({method: 'GET', url:url, headers: {'trakt-api-key':'8ffe7e12ccdefbb0864f59a0a49faae085121ca35c09b6eb663cd4072788e509', 'trakt-api-version':2, 'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response.data)
                    return response.data;
            })*/


        }

        function renderSearch(response) {

            var searchObj = response.data;
            var results = [];
            var resultsLength = searchObj.results.length;
            console.log(searchObj);
            for(var i=0; i<resultsLength; i++)
            {
                var obj = {
                    id: searchObj.results[i].id,
                    name: searchObj.results[i].name,
                    description: searchObj.results[i].overview,
                    posterPath : searchObj.results[i].poster_path,
                    rating: searchObj.results[i].vote_average
                };
                results.push(obj);
            }
            console.log(results);
            console.log('hi'+results);
            return results;
        }

        function getSearchDetailsById(seriesId) {

            var url = "https://api.themoviedb.org/3/tv/"+seriesId+"?api_key=5a57d87cef01b95a12c3ca8862bf24f7&language=en-US";

            return $http.get(url)
                .then(renderSearchDetails);

        }

        function renderSearchDetails(response) {

            var searchDetailsObj = response.data;
            return searchDetailsObj;
        }
    }
})();