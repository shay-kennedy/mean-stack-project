'use strict';

var angular = require('angular');

angular.module('resourceApp')
.controller('mainCtrl', ['$scope', 'dataService', function($scope, dataService) {

	$scope.addResource = function() {
		var resource = {
			title: "Enter title for resource",
			url: "Enter URL to resource",
			notes: "Enter notes about this resource"
		};
		$scope.resources.unshift(resource);
	};

	dataService.getResources(function(response) {
		console.log(response.data);
		var resources = response.data.resources;
		$scope.resources = resources;
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