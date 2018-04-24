define( require => {
  const Backbone = require("Backbone");
  const template = require("text!./template.html");
  const ajax     = require("utils/ajax");
//  const io       = require("utils/socket");

  return Backbone.View.extend({

    // USE COLLECTION!!!

    events : {
      "click [js-connect]" : "connect"
    },

    initialize : function(){
      this.$el.html(template);
      this.$player = this.$el.find("[js-game-player]");
    },

    connect : function(){
      let player = this.$player.val();

      ajax('/connect').then( (data) =>{
        console.log(data)
        this.$el.append(`<div id='${data.player}'>Player ${data.player} <input type='button' value="kick" js-disconnect='${data.player}'></div>`);
        this.events["click [js-disconnect]"] = "disconnect";

        this.delegateEvents();
      });
    },

    disconnect : function(event){
      let player = event.currentTarget.getAttribute("js-disconnect");
      ajax('/disconnect', {player}).then( () =>{
      console.log("pepe2")
        this.$el.find(`#${player}`).remove();
      });
    }
  });
});
