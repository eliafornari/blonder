import jQuery from "jquery";
import angular from 'angular'
import 'angular-route'
import 'angular-animate'
import 'angular-resource'
import Prismic from 'prismic.io'



angular.module('myApp', ["ngRoute", "ngAnimate", "ngResource"])
.run(['$rootScope', '$location','$route', '$templateCache',($rootScope, $location, $route, $templateCache)=>{

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        else if (reload === true){

          var currentPageTemplate = $route.current.templateUrl;
            $templateCache.remove(currentPageTemplate);

        var un = $rootScope.$on('$locationChangeSuccess', function () {
              $route.current = '/';
              un();
              $route.reload();
          });
        }
        return original.apply($location, [path]);
    };

}])

.service('anchorSmoothScroll', function(){

    this.scrollTo = function(eID) {

        // This scrolling function
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };

})




.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
  $routeProvider



    /*............................. Take-all routing ........................*/


    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'aboutCtrl'
    })

    .when('/contact', {
      templateUrl: 'views/contact.html'
    })

    .when('/:id', {
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })

    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'homeCtrl'
    })



    // put your least specific route at the bottom
    .otherwise({redirectTo: '/'})



}]) //config


.filter('trustUrl', function ($sce) {
  return function(url) {
    // if (url){
      var trusted = $sce.trustAsResourceUrl(url);
      return trusted;
    // }
  };
})




.controller('appCtrl', ($scope, $location, $rootScope, $routeParams, $timeout, $interval, anchorSmoothScroll)=>{


    $rootScope.location = $location.path();

  $rootScope.firstLoading = true;








  $scope.isShare=false;
  $rootScope.openShare=function(){
    $scope.isShare=!$scope.isShare;
  }




  $rootScope.isSoundOpen = false;
  $rootScope.soundNumber = 0;

  $rootScope.openSound = function(){
    $rootScope.isSoundOpen = !$rootScope.isSoundOpen;
  }

  $rootScope.thisSound = (n)=>{

    $rootScope.soundNumber = n;

  }












  //..................................................changing anchor link on click
    $rootScope.gotoAnchor = function(x) {

          var str = x;
          str = str.substring(0, str.length - 4);

          console.log(str);

          var newHash = str;
          if ($location.path() !== newHash) {
            // $location.path(str,false);
          // call $anchorScroll()
          console.log(newHash);
          anchorSmoothScroll.scrollTo(newHash);


          } else {

            $anchorScroll();
          }
        };



      $rootScope.hashFn = function(x){
                var newHash = x;

              if ($location.path(newHash) !== x) {
                $location.path(x, false);

              } else {

                $anchorScroll();
              }
      }





















  //..............................................................................mobile


  //....this is the function that checks the header of the browser and sees what device it is

  $rootScope.checkDevice = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return ($rootScope.checkDevice.Android() || $rootScope.checkDevice.BlackBerry() || $rootScope.checkDevice.iOS() || $rootScope.checkDevice.Opera() || $rootScope.checkDevice.Windows());
        }
    };

  //........checks the width

    $scope.mobileQuery=window.matchMedia( "(max-width: 767px)" );
    $rootScope.isMobile=$scope.mobileQuery.matches;


  //.........returning true if device

    if ($scope.checkDevice.any()){
      $rootScope.isDevice= true;

    }else{
        $rootScope.isDevice=false;
    }

    if (($rootScope.isDevice==true)&&($scope.isMobile==true)){
      $rootScope.isMobileDevice= true;
    }else{
        $rootScope.isMobileDevice=false;
    }




      if ($rootScope.isDevice){

          $rootScope.mobileLocation = function(url){
            $location.path(url).search();
          }

          $rootScope.mobileExternalLocation = function(url){
            $window.open(url, '_blank');
          }


      } else if (!$rootScope.isDevice){


          $rootScope.mobileLocation = function(url){
            return false;
          }

          $rootScope.mobileExternalLocation = function(url){
            return false;
          }
      }







})// end of appCtrl

.directive('socialDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/components/social.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
})

.directive('tourDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'views/tour.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});



// var jquerymousewheel = require('./vendor/jquery.mousewheel.js')($);
var jqueryUI = require('./vendor/jquery-ui.min.js');
var service = require("./service.js");
var nav = require("./nav.js");
var home = require("./home.js");
var about = require("./about.js");
var tour = require("./tour.js");
