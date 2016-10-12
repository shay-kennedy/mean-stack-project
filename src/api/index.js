'use strict';

var express = require('express');
var Resource = require('../models/resource');
// var resources = require('../../mock/items.json');

var router = express.Router();

router.get('/resources', function(req, res) {
	Resource.find({}, function(err, resources) {
		if(err) {
			return res.status(500).json({err: err.message});
		}
		res.json({resources: resources});
	});
});

router.post('/resources', function(req, res) {
	var resource = req.body;
	Resource.create(resource, function(err, resource) {
		if(err) {
			return res.status(500).json({err: err.message});
		}
		res.send({'resource': resource, message: 'Resource Created'});
	});	
});

router.put('/resources/:id', function(req, res) {
	var id = req.params.id;
	var resource = req.body;
	if(resource && resource._id !== id) {
		return res.status(500).json({err: "Id's don't match!"})
	}
	Resource.findByIdAndUpdate(id, resource, {new: true}, function(err, resource) {
		if(err) {
			return res.status(500).json({err: err.message});
		}
		res.send({'resource': resource, message: 'Resource Updated'});
	});	
});

router.delete('/resources/:id', function(req, res) {
	var id = req.params.id;
	if(resource._id !== id) {
		return res.status(500).json({err: "Id's don't match!"})
	}
	Resource.remove({'_id': id}, function(err, resource) {
		if(err) {
			return res.status(500).json({err: err.message});
		}
		res.send({message: 'Resource Deleted'});
	});	
});

module.exports = router;