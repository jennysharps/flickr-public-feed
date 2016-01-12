define([
  'backbone',
  'models/flickr-photo'
], function (Backbone, FlickrPhotoModel) {
    var collection = {};

    collection.url = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?'

    collection.model = FlickrPhotoModel;

    collection.parse = function(res) {
        if (_.isObject(res.items)) {
            return res.items;
        } else {
            return res;
        }
    };

    collection.sync = function(method, collection, options) {
        options.dataType = "jsonp";
        options.data = options.data || {};
        options.data.format = "json";

        return Backbone.sync(method, collection, options);
    };

    return Backbone.Collection.extend(collection);
});