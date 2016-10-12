'use strict';

var angular = require('angular');

angular.module('resourceApp')
.service('dataService', ['$http', function($http, $q) {

	this.getResources = function(callback) {
		$http.get('/api/resources')
		.then(callback)
	};

	this.deleteResource = function(resource) {
		console.log("The " + resource.title + " resource has been deleted!");
	};

	this.saveResources = function(resources) {
		var queue = [];
		resources.forEach(function(resource) {
			var request;
			if(!resource._id) {
				request = $http.post('/api/resources', resource)
			};
			queue.push(request);
		});
		return $q.all(queue).then(function(results) {
			console.log("I saved " + resources.length + " resources!");
		});
	}

}]);