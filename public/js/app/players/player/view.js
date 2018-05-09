define( require => {
  const Backbone = require("Backbone");
  const _        = require("underscore");
  const template = require("text!./template.html");
  const io       = require("utils/socket");

  return Backbone.View.extend({

    tagName : "tr",

    states : {
      true  : "live",
      false : "dead"
    },

    initialize : function(options){
      this.model    = options.model;
      this.el.id    = this.model.get('id');
      this.template = _.template(template);
      this.render();

      io.on("player:DISCONNECT", this.inactive.bind(this));
      io.on("player:RECONNECT", this.inactive.bind(this));
    },

    render : function(data){
      this.data = data || this.model.toJSON();

      (this.data.kills) || (this.data.kills = 0);
      (this.data.score) || (this.data.score = 0);

      this.data.alive = (_.isUndefined(this.data.alive) || this.data.alive) ? true : false;
      this.data.state = this.states[this.data.alive];

      try{
        this.$el.html(this.template(this.data));
      }catch(e){
        console.error(e);
      }
    },

    inactive : function(){
      this.$el.find('[js-dot-state]')
        .removeClass('live-dot')
        .removeClass('dead-dot')
        .addClass('inactive-dot');
    },

    active : function(data){
      let alive = (_.isUndefined(data.status) || data.status) ? true : false;
      let state = this.states[alive];

      this.$el.find('[js-dot-state]')
        .removeClass('inactive-dot')
        .removeClass(`${state}-dot`);
    }
  });
});
