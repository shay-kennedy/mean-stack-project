'use strict';

angular.module('resourceApp')
.service('dataService', ['$http', function($http) {
	this.helloConsole = function() {
		console.log('This the the helloConsole service.');
	};

	this.getResources = function(callback) {
		$http.get('../mock/resources.json')
		.then(callback)
	};

	this.deleteResource = function(resource) {
		console.log("The " + resource.title + " resource has been deleted!");
	};

	this.saveResources = function(resources) {
		console.log(resources.length + " resource have been saved!");
	}

}]);