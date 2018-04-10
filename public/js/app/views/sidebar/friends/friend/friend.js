'use strict';
  
define(["Backbone", "text!/js/app/views/sidebar/friends/friend/friend.html", "css!/js/app/views/sidebar/friends/friend/friend"], (Backbone, template) => {
  return Backbone.View.extend({
    template  : _.template(template),
    tagName   : 'div',
    className : 'friend',

  	initialize(){
      this.render();
  	},

    render(model){
      let data = this.model;
      this.$el.append(this.template(this.model));
    }
  });
});
