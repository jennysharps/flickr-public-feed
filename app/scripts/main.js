require.config({
	paths: {
		"jquery": "../vendor/jquery/dist/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone"
	}
});

require([
	'jquery',
	'views/app',
	'models/flickr-photo',
	'collections/flickr-photos'
], function($, AppView, FlickrPhotoModel, FlickrPhotoCollection) {
	new AppView;
	var photo = new FlickrPhotoModel({'name': "photo1"});
	console.log(photo.get('name'));
	console.log(photo.get('title'));
	console.log(photo.get('nonexistent'));

	window.glob = photo;

	var photoFeed = new FlickrPhotoCollection();

	var $main = $('#main'),
		$ul = $main.append('<ul>');

	photoFeed.on('add', updateView);

	photoFeed.fetch({
		data: {
			tagmode: 'all',
            tags: 'potato'
        }
    });
	window.feed = photoFeed;

	function updateView(item) {
		var $template = $('<li>');
		$template.append('<a href="' + item.get('link') + '"><img src="' + item.get('imgsrc') + '">');
		$template.append('<h1><a href="/detail/' + item.get('id') + '">' + item.get('title') + '</a></h1>');
		$template.append('<a href="' + item.get('author').get('id') + '">' + item.get('author').get('name') + '</a>');
		$ul.append($template);
	}
});