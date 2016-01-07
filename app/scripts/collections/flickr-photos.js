define([
  'backbone',
  'models/flickr-photo'
], function (Backbone, FlickrPhotoModel) {
    var collection = {};

    collection.url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?'

    collection.model = function(attrs, options) {
        return new FlickrPhotoModel(attrs, options);
    };

    collection.parse = function(res, options) {
        var photos = [];

        if(res !== undefined && res.items !== undefined) {
            for(var x = 0; x < res.items.length; x++) {
                photos.push(collection.model(res.items[x], options));
            }
        }

        return photos;
    };

    collection.sync = function(method, collection, options) {
        options.dataType = "jsonp";
        options.data = options.data || {};
        options.data.format = "json";

        return Backbone.sync(method, collection, options);
    };

    return Backbone.Collection.extend(collection);
});