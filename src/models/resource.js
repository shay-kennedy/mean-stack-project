'use strict';

var mongoose = require('mongoose');

var resourceSchema = new mongoose.Schema({
	title: { type: String},
	url: { type: String},
	notes: { type: String},
	archived: { type: Boolean, default: false }
});

var model = mongoose.model('Resource', resourceSchema);

module.exports = model;
