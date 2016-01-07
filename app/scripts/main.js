require.config({
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone"
	}
});

require([
	'views/app',
	'models/flickr-photo',
	'collections/flickr-photos'
], function(AppView, FlickrPhotoModel, FlickrPhotoCollection) {
	new AppView;
	var photo = new FlickrPhotoModel({'name': "photo1"});
	console.log(photo.get('name'));
	console.log(photo.get('title'));
	console.log(photo.get('nonexistent'));

	window.glob = photo;

	var photoFeed = new FlickrPhotoCollection();
	photoFeed.fetch({
		data: {
			tagmode: 'all',
               tags: 'potato'
        }
    });
	window.feed = photoFeed;
});