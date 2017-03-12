angular.module('myApp')
.controller('tourCtrl', function($scope, $location, $rootScope, $routeParams, $timeout, $interval, $window, $http){

$rootScope.pageLoading = false;


$rootScope.bandsintownJSONP = function(artist){
  console.log(artist);
  // var url =''
  // var url = 'https://api.bandsintown.com/artists/'+artist+'/events.json?api_version=2.0&app_id=HIGHLYSUSPECT&callback=JSON_CALLBACK';


      $http({
            url: '/api/tour/'+artist+'/get',
            method: 'GET'
          }).then( function(response){
            console.log(response);
            $rootScope.tour = response.data;

          }, function(response){
            console.log("form failed!");
            console.log(response);
            $rootScope.tour = response.data;

          });

    // $http.jsonp(url).
    //     success(function(data, status, headers, config) {
    //
    //       var thisData = [];
    //       var thisData = data;
    //
    //       console.log(data);
    //
    //
    //       $rootScope.tour = data;
    //
    //         //what do I do here?
    //     }).
    //     error(function(data, status, headers, config) {
    //         $scope.error = true;
    //     });

}
$rootScope.bandsintownJSONP('Blonder');


});
