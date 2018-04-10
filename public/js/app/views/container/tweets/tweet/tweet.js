'use strict';
  
define(["Backbone", "text!/js/app/views/container/tweets/tweet/tweet.html", "css!/js/app/views/container/tweets/tweet/tweet"], (Backbone, template) => {
  return Backbone.View.extend({
    template  : _.template(template),
    tagName   : 'div',
    className : 'tweet',

  	initialize(){
      this.render();
  	},

    render(model){
      let data = this.model.attributes;
      console.log(this.model);

      this.$el.append(this.template(data));
    }
  });
});
