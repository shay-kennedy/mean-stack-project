'use strict';

var Resource = require('./models/resource.js');

var resources = [
	{
	"title": "How to learn MongoDB.",
	"url": "www.google.com",
	"notes": "Just some notes about why I bookmarked this resource"
	},
	{
	"title": "How to learn ExpressJS.",
	"url": "www.google.com",
	"notes": "Just some notes about why I bookmarked this resource"
	},
	{
	"title": "How to learn AngularJS.",
	"url": "www.google.com",
	"notes": "Just some notes about why I bookmarked this resource"
	},
	{
	"title": "How to learn NodeJS.",
	"url": "www.google.com",
	"notes": "Just some notes about why I bookmarked this resource"
	}
];

resources.forEach(function(resource, index) {
	Resource.find({'title': resource.title, 'url': resource.url, 'notes': resource.notes}, function(err, resources) {
		if(!err && !resources.length) {
			Resource.create({archived: false, title: resource.title, url: resource.url, notes: resource.notes});
		};
	});
});