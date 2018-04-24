define( require => {
  const Backbone = require("Backbone");
  const io       = require("utils/socket");
  const ajax     = require("utils/ajax");

  return Backbone.Collection.extend({

    url : '/players',

    initialize : function(){

      ajax("/players").then( (data) => {
        let players = _.map(data, player => {
          return { id : player };
        });
        this.add(players);
      } );
//      this.fetch();
//      this.connect();
    },

    connect : function(){
      io.on('player:CONNECT'   , this.addPlayer.bind(this));
    },

    addPlayer : function(data){
      console.log("PEPEEEEE", data)

    },

    kickPlayer : function(data){

    }
  });
});
