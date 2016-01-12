define([
    'backbone',
    'models/author'
], function(Backbone, AuthorModel) {
    var model = {};

    model.defaults = {
        id: null,
        title: null,
        link: null,
        imgsrc: null,
        published: null,
        description: null,
        author: new AuthorModel(),
        tags: []
    };

    model.initialize = function(attrs, options) {
        console.log('Model initialized');
    };

    model.parse = function(res, options) {
        var attrs = {};
        res = res || {};

        attrs.id = res.link.substring(res.link.replace(/\/$/, '').lastIndexOf('/') + 1);
        attrs.title = res.title;
        attrs.link = res.link;
        attrs.imgsrc = res.media ? res.media.m : undefined;
        attrs.published = res.published;

        var $description = $(res.description);

        var authorInfo = $($description[0]).find('a');
        attrs.author = new AuthorModel({
            name: authorInfo.html(),
            id: res.author_id,
            link: authorInfo.attr('href')
        });

        if($description.length > 3) {
            attrs.description = _.last($description).innerHTML;
        }

        if(res.tags) {
            attrs.tags = [];
            _.each(res.tags.split(" "), function(tag) {
                attrs.tags.push(tag);
            });
        }

        return attrs;
    };

    model.validate = function(attrs, options) {
        if(attrs.published && typeof attrs.published !== 'number') {
            return '`publish_date` should be a number.';
        }
    };

    return Backbone.Model.extend(model);
});