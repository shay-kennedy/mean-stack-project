'use strict';

var express = require('express');
var resources = require('../../mock/items.json');

var router = express.Router();

router.get('/resources', function(req, res) {
	res.json({resources: resources});
});

// TODO: Add POST route to create new entries

// TODO: Add PUT route to update existing entries

// TODO: Add DELETE route to delete entries

module.exports = router;