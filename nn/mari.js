var moviApp = angular.module("moviApp", ['ngRoute', 'ngResource']);

moviApp.config(function ($routeProvider)
{
    $routeProvider
        .when('/',
        {
            templateUrl: 'pages/home.htm',
            controller: 'homeController'
        })

        .when('/movies',
        {
            templateUrl: 'pages/movies.htm',
            controller: 'movieController'
        })

        .when('/artist',
        {
            templateUrl: 'pages/artists.htm',
            controller: 'artistController'
        })
});

moviApp.controller('homeController', [function ()
{
}]);

moviApp.controller('movieController', ['$scope', '$http', function ($scope, $http)
{
    $scope.title = '';


    $("#SpecBut1").click(function() {
        console.log($scope.title);
        $http.get('http://www.omdbapi.com/?s=' + $scope.title.replace(" ", "+"))
            .success(function (result) {
                $scope.results = result.Search;
                //$scope.title = result.Title;
                //$scope.year = "(" + result.Year + ")";
                //$scope.actors = "Actors: " + result.Actors;
                //$scope.plot = "Plot: " + result.Plot;
            })
            .error(function (data, status) {
                console.log("Error!");
            });
    });
}]);

moviApp.controller('artistController', ['$scope', '$http', function ($scope, $http)
{
    $scope.artist = '';


    $("#SpecBut2").click(function() {
        console.log($scope.artist);
        $http.get('http://lyrics.wikia.com/api.php?func=getArtist&artist='+ $scope.artist.replace(' ', '+') +'&fmt=realjson')
            .success(function (result) {
                $scope.albums = result.albums;
            })
            .error(function (data, status) {
                console.log("Error!");
            });
    });
}]);