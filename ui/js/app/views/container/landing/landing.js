'use strict';
  
define(["Backbone", "text!/js/app/views/container/landing/landing.html", "css!/js/app/views/container/landing/landing"], (Backbone, template) => {
  return Backbone.View.extend({
    tagName  : "section",
    id       : "landing",
    template : template,

  	initialize(){
      this.render();
  	},

    render(){
      this.$el.html( this.template );
    }
  });
});
