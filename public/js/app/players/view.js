define( require => {
  const Backbone   = require("Backbone");
  const _          = require("underscore");
  const PlayerView = require("./player/view");
  const template   = require("text!./template.html");
  const ajax       = require("utils/ajax");
  const io       = require("utils/socket");

  return Backbone.View.extend({

    events : {
      "click [js-connect]" : "TESTconnect"
    },

    initialize : function(){
      const Collection = require('./collection');

      // Will fetch on its initialize
      this.collection = new Collection({ url : '/players' });
      this.collection.on("add", this.addPlayer.bind(this));

      this.$el.html(template);
      this.$tbody  = this.$el.find("tbody");
      this.$player = this.$el.find("[js-game-player]");

      io.on("player:CONNECT", this.connect.bind(this));
    },

    connect : function(data){
      this.collection.add({id : data.id});
      this.events["click [js-disconnect]"] = "disconnect";
      this.delegateEvents();
    },

    TESTconnect : function(){
      ajax('/connect');
    },

    disconnect : function(event){
      let player = event.currentTarget.getAttribute("js-disconnect");
      ajax('/disconnect', {player}).then( () =>{
        this.$el.find(`#${player}`).remove();
        let kicked = this.collection.find({id : player});
        this.collection.remove(kicked);
      });
    },

    addPlayer(model){
      if(_.isEmpty(model.toJSON()) || !model.get("id")){ return; }
      let player = new PlayerView({ model });
      this.$el.append(player.el);
    }
  });
});
