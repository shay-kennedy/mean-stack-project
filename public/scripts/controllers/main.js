'use strict';

angular.module('resourceApp')
.controller('mainCtrl', ['$scope', 'dataService', function($scope, dataService) {
	$scope.helloConsole = dataService.helloConsole;

	$scope.addResource = function() {
		var resource = {title: "This is a new resource."};
		$scope.resources.unshift(resource);
	};

	dataService.getResources(function(response) {
		console.log(response.data);
		$scope.resources = response.data;
	});

	$scope.deleteResource = function(resource, $index) {
		dataService.deleteResource(resource);
		$scope.resources.splice($index, 1);
	};

	$scope.saveResources = function() {
		var filteredResources = $scope.resources.filter(function(resource) {
			if(resource.edited) {
				return resource;
			};
		})
		dataService.saveResources(filteredResources);
	};

}])