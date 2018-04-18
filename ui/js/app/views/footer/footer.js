'use strict';
  
define(["Backbone", "css!/js/app/views/footer/footer"], Backbone => {
  return Backbone.View.extend({
  	initialize(){
      this.render();
  	},

    render(){
      this.$el.html("<span>See it at <a style='color : white' href='https://github.com/StarBlizard/garuda'>Git</a></span>");
    }
  });
});
