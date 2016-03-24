var Contact = angular.module('myApp');

Contact.controller('contactCtrl', function($scope, $location, $rootScope, $routeParams, $timeout,	$http){




});





Contact.directive('contactDirective', function($rootScope, $location, $window, $routeParams, $timeout) {
  return {
    restrict: 'E',
    templateUrl: 'contact/contact.html',
    replace: true,
    link: function(scope, elem, attrs) {

    }
  };
});
