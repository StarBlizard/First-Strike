'use strict';

define(["Backbone"], Backbone => {
  return Backbone.Collection.extend({
    url : '/friends'
  });
});
