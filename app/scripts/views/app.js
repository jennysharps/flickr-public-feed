define([
	'backbone'
], function(Backbone) {
	var view = {};

	view.initialize = function() {
		console.log('View initlaized');
	};

	return Backbone.View.extend(view);
});