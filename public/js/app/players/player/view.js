define( require => {
  const Backbone = require("Backbone");
  const _        = require("underscore");
  const template = require("text!./template.html");

  return Backbone.View.extend({

    initialize(options){
      this.model    = options.model;
      this.template = _.template(template);
      this.render();
    },

    render(){
      let data = this.model.toJSON();
      this.$el.html(this.template(data));
    }

  });
});
