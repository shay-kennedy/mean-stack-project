'use strict';

var angular = require('angular');

angular.module('resourceApp')
.service('dataService', ['$http', '$q', function($http, $q) {

	this.getResources = function(callback) {
		$http.get('/api/resources')
		.then(callback)
	};

	this.deleteResource = function(resource) {
		if (!resource._id) {
			return $q.resolve();
		}
		$http.delete('/api/resources/' + resource._id).then(function() {
			console.log("I deleted the " + resource.title + " resource!");
		});
	};

	this.saveResources = function(resources) {
		var queue = [];
		resources.forEach(function(resource) {
			var request;
			if(!resource._id) {
				request = $http.post('/api/resources', resource)
			} else {
				request = $http.put('/api/resources/' + resource._id, resource).then(function(result) {
					resource = result.data.resource;
					return resource;
				})
			};
			queue.push(request);
		});
		return $q.all(queue).then(function(results) {
			console.log("I saved " + resources.length + " resources!");
		});
	}

}]);