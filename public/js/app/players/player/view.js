define( require => {
  const Backbone = require("Backbone");
  const _        = require("underscore");
  const template = require("text!./template.html");

  return Backbone.View.extend({

    tagName : "tr",

    states : {
      true  : "live",
      false : "dead"
    },

    initialize : function(options){
      this.model    = options.model;
      this.template = _.template(template);
      this.render();
    },

    render : function(data){
      this.data = data || this.model.toJSON();

      (this.data.score) || (this.data.score = 0);

      this.data.alive = (_.isUndefined(this.data.alive) || this.data.alive) ? true : false;
      this.data.state = this.states[this.data.alive];

      try{
        this.$el.html(this.template(this.data));
      }catch(e){
        console.error(e);
      }
    }

  });
});
