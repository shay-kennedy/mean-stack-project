'use strict';

var Resource = require('./models/resource.js');

var resources = [
	{
	"title": "MongoDB Courses",
	"url": "university.mongodb.com/",
	"notes": "MongoDB University - list of online courses"
	},
	{
	"title": "ExpressJS tutorial",
	"url": "www.youtube.com/watch?v=NALxjuyRXaE",
	"notes": "Beginner Express Star Wars You Tube tutorial"
	},
	{
	"title": "AngularJS resources",
	"url": "docs.angularjs.org/guide",
	"notes": "Angular 1.x Documentation - developer guide"
	},
	{
	"title": "NodeJS meetup",
	"url": "www.meetup.com/NodeAZ/",
	"notes": "Local NodeAZ meetup group - meets every 3rd Monday"
	}
];

resources.forEach(function(resource, index) {
	Resource.find({'title': resource.title, 'url': resource.url, 'notes': resource.notes}, function(err, resources) {
		if(!err && !resources.length) {
			Resource.create({archived: false, title: resource.title, url: resource.url, notes: resource.notes});
		};
	});
});