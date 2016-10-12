'use strict';

var angular = require('angular');

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