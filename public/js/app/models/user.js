'use strict';

define(["Backbone"], (Backbone, template, User) => {
  return Backbone.Model.extend({
    url : '/user'
  });
});
