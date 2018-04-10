'use strict';
  
define(["Backbone", "text!/js/app/views/container/tweets/newTweet/newTweet.html", "css!/js/app/views/container/tweets/newTweet/newTweet"], (Backbone, template) => {
  return Backbone.View.extend({
    template  : _.template(template),
    tagName   : 'div',
    id        : 'newTweet',

  	initialize(){
      this.render();
  	},

    render(){
      this.$el.append(this.template(this));
    }
  });
});
