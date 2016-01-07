define([
    'backbone',
    'models/author'
], function(Backbone, AuthorModel) {
    var model = {};

    model.defaults = {
        title: null,
        link: null,
        imgSrc: null,
        publishDate: null,
        author: new AuthorModel(),
        tags: []
    };

    model.initialize = function(attrs, options) {
        console.log('Model initialized');
    };

    model.parse = function(res, options) {
        var attrs = {};
        res = res || {};

        attrs.title = res.title;
        attrs.link = res.link;
        attrs.imgSrc = res.media ? res.media.m : undefined;

        attrs.author = new AuthorModel({
            name: res.author,
            id: res.author_id
        });

        attrs.tags = [];
        _.each(res.tags.split(" "), function(tag) {
            attrs.tags.push(tag);
        });

        return attrs;
    };

    return Backbone.Model.extend(model);
});