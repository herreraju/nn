String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.capitalize = function(){
    return this.toLowerCase().replace( /\b\w/g, function (m) {
        return m.toUpperCase();
    });
};

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
    $scope.catagory = '';
    $scope.question = '';
    $scope.answer = '';
    $("#SpecBut2").click(function() {
        $http.get('http://jservice.io/api/random')
            .success(function (result) {
                document.getElementById("an").style.visibility = "hidden";
                $scope.category = result[0].category.title.capitalize();
                $scope.question = result[0].question;
                $scope.answer = result[0].answer.replace("<i>", "").replace("</i>", "");
            })
            .error(function (data, status) {
                console.log("Error!");
            });
    });
    $("#SpecBut3").click(function() {
        document.getElementById("an").style.visibility = "visible";
    });
}]);