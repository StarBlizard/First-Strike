'use strict';
  
define(["Backbone"], Backbone => {
  return Backbone.View.extend({
  	initialize(opc){
      if(opc.logged){
        require(["../app/views/container/tweets/tweets"], tweets => {
          this.tweets = new tweets();
          this.render(this.tweets.$el); 
        });
      }else{
        require(["../app/views/container/landing/landing"], landing => {
          this.landing = new landing();
          this.render(this.landing.$el);
        })
      } 
  	},

    render($el){
      this.$el.append($el);
    }
  });
});
