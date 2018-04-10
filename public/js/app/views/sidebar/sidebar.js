'use strict';
  
define(["Backbone", "views/sidebar/friends/friends",  "text!/js/app/views/sidebar/sidebar.html", "css!/js/app/views/sidebar/sidebar"], (Backbone, friends, template) => {
  return Backbone.View.extend({
    template : _.template(template),

  	initialize(opc){ 
      this.friends = new friends();
      this.render();
  	},

    render(){
      this.$el.append(this.template(this.model), this.friends.$el);
      this.$el.css("background", "linear-gradient(to top, #7575a3 0%, #" + this.model.headColor +" 100%)");
      $("#footer").css("background-color", "#7575a3");

      $("#logout").click(() => {
        $.ajax({
          type : 'POST',
          url  : '/logout',
          success : () => {
            window.location = '/';
          }
        });
      });
    }
  });
});
