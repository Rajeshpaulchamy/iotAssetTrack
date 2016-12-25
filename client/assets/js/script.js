
// create the module and name it iotApp
var iotApp = angular.module('iotApp', ['ngRoute']);

// configure our routes
iotApp.config(function($routeProvider) {
	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'mainController'
		})

		// route for the about page
		.when('/about', {
			templateUrl : 'pages/about.html',
			controller  : 'aboutController'
		})

		// route for the contact page
		.when('/contact', {
			templateUrl : 'pages/contact.html',
			controller  : 'contactController'
		});
});

// create the controller and inject Angular's $scope
iotApp.controller('mainController', function($scope, $http) {
	// create a message to display in our view
	$scope.message = 'Everyone come and see how good I look!';

	angular.element(document).ready(function () {
		$http({
			url: "/controller",
			method: "POST",
			params: {
				method: "methodName",
				params: {
					one: "1",
					two: "2"
				}
			}
		}).then(function (response){
			document.getElementById('msg').innerHTML = response.data.msg;
		});

	});
});

iotApp.controller('aboutController', function($scope) {
	$scope.message = 'Look! I am an about page.';
});

iotApp.controller('contactController', function($scope) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});



