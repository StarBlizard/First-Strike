define( require => {

  const Backbone = require("Backbone");
  const ajax     = require("utils/ajax");
  const template = require("text!./template.html");

  return Backbone.View.extend({

    events : {
      "click [js-startgame]" : "startGame"
    },

    initialize : function(){
      this.$el.html(template);
      this.$gameTimer = this.$el.find("[js-game-timer]");
      this.interval;
    },

    startGame : function(){
      let timer   = this.$gameTimer.val();
      let counter = 0;

      this.$el.find("#valid").remove();
      if(!timer*1 || timer*1 ==0){ return this.$el.append("<label id='valid'>Ingrese una cantidad valida</label>") }

      ajax('/start', {timer : timer*1000}).then( () => {
        console.log("[INFO] Game started")

        this.$el.html(`<div id='counter'>Tiempo Restante: ${timer}</div>`);
        this.$el.append(`<div><input type='button' value='Stop' js-stopgame></div>`);
        timer--;

        this.events["click [js-stopgame]"] = "stopGame";
        this.delegateEvents();

        this.interval = setInterval(() => {
          this.$el.find("#counter").html(`Tiempo Restante: ${timer}`);
          if(!timer){ console.log("stop"); return this.stopGame() }
          timer--;
        }, 1000);
      })
    },

    stopGame: function(){
      ajax('/stop').then( () => {
        console.log("[INFO] Game ended")
        clearInterval(this.interval);
        this.interval = undefined;
        this.$el.html(template);
        this.$gameTimer = this.$el.find("[js-game-timer]");
      });
    }
  });
});
