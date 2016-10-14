webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('resourceApp', []);

	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('resourceApp')
	.controller('mainCtrl', ['$scope', 'dataService', function($scope, dataService) {

		$scope.addResource = function() {
			var resource = {
				title: "Enter title for resource",
				url: "localhost:8080",
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
			dataService.saveResources(filteredResources)
			.finally($scope.resetResourceState());
		};

		$scope.resetResourceState = function() {
			$scope.resources.forEach(function(resource) {
				resource.edited = false;
			});
		};

	}])

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	// Custom Directive
	angular.module('resourceApp')
	.directive('resources', function() {
		return {
			templateUrl: 'templates/resources.html',
			controller: 'mainCtrl'
			// By using replace, Angular will inject the template inside of the custom tags and get rid of the tags themselves 
			// replace: true
		}
	})

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

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

/***/ }
]);