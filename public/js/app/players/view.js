define( require => {
  const Backbone   = require("Backbone");
  const _          = require("underscore");
  const PlayerView = require("./player/view");
  const template   = require("text!./template.html");
  const ajax       = require("utils/ajax");
  const io         = require("utils/socket");

  return Backbone.View.extend({

    events : {
      "click [js-connect]"    : "TESTconnect",
      "click [js-disconnect]" : "disconnect",
      "click [js-shot]"       : "TESTshot",
      "click [js-hit]"        : "TESThit"
    },

    playersViews : {},

    initialize : function(){
      const Collection = require('./collection');

      // Will fetch on its initialize
      this.collection = new Collection({ url : '/players' });
      this.collection.on("add", this.addPlayer.bind(this));

      this.$el.html(template);
      this.$tbody  = this.$el.find("tbody");
      this.$player = this.$el.find("[js-game-player]");

      io.on("player:CONNECT", this.connect.bind(this));
      io.on("player:HIT"    , this.hit.bind(this));
      io.on("player:KICK"   , this.erase.bind(this));
      io.on('game:START'    , this.start.bind(this));
    },

    start : function(){
      this.$tbody.empty();
      this.collection.reset();
      this.collection.fetch();
    },

    connect : function(data){
      this.collection.add({id : data.id});
      this.delegateEvents();
    },

    hit : function(data){
      let { shooter, hitted } = data;

      this.playersViews[shooter.id].render(shooter);
      this.playersViews[hitted.id].render(hitted);
    },

    erase : function(data){
      let kicked = this.collection.find(data);

      this.playersViews[data.id].remove();
      this.collection.remove(kicked);
    },

    addPlayer : function(model){
      if(_.isEmpty(model.toJSON()) || !model.get("id")){ return; }

      let player = new PlayerView({ model });

      this.$tbody.append(player.el);
      this.playersViews[model.get("id")] = player;
    },

    disconnect : function(event){
      let player = event.currentTarget.getAttribute("js-disconnect");
      ajax('/disconnect', { player });
    },

    TESTconnect : function(event){
      ajax('/connect');
    },

    TESTshot : function(event){
      let player = event.currentTarget.getAttribute('js-shot');

      this.shooter = player;
      ajax('/shot', { player });
    },

    TESThit : function(event){
      let player = event.currentTarget.getAttribute('js-hit');

      ajax('/hit', { shooter : this.shooter, hitted : player });
    }

  });
});
