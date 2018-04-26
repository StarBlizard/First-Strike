define( require => {
  const Backbone = require("Backbone");
  const _        = require("underscore");
  const template = require("text!./template.html");

  return Backbone.View.extend({

    tagName : "tr",

    initialize(options){
      this.data     = options.model.toJSON();
      this.template = _.template(template);
      this.el.id    = this.data.id;
      this.render();
    },

    render(){
      this.$el.html(this.template(this.data));
    }

  });
});
