define( require => {

  const Backbone = require("Backbone");

  return Backbone.View.extend({

    tagName : 'tr',

    initialize : function(options){
      const template = require("text!./template.html");
      const io       = require("utils/socket");

      this.template = _.template(template);
      this.render(options.data)
    },

    render : function(data){
      this.$el.html(this.template(data));
    }
  });
});
