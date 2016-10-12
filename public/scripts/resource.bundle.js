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
	.service('dataService', ['$http', function($http) {
		this.helloConsole = function() {
			console.log('This the the helloConsole service.');
		};

		this.getResources = function(callback) {
			$http.get('/api/resources')
			.then(callback)
		};

		this.deleteResource = function(resource) {
			console.log("The " + resource.title + " resource has been deleted!");
		};

		this.saveResources = function(resources) {
			console.log(resources.length + " resource have been saved!");
		}

	}]);

/***/ }
]);