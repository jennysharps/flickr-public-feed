define([
	'backbone'
], function(Backbone) {
	var model = {};

	model.defaults = {
		name: null,
		id: null,
		link: null
	};

	model.initialize = function(attrs, options) {
		console.log('Model initialized');
	};

	return Backbone.Model.extend(model);
});