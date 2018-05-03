define( require => {

  const Backbone = require("Backbone");
  const ajax     = require("utils/ajax");
  const io       = require("utils/socket");
  const template = require("text!./template.html");

  return Backbone.View.extend({

    events : {
      "click [js-startgame]" : "startGame",
      "click [js-stopgame]"  : "stopGame"
    },

    initialize : function(options){
      ajax('/state').then( data => {
        this.$el.html(template);
        this.$gameTimer = this.$el.find("[js-game-timer]");

        if(data.started){
          this.time = data.time;
          this.drawClock();
        }

        io.on("game:SECOND", this.updateClock.bind(this));
        io.on("game:ENDED" , this.reset.bind(this));
        io.on('game:START' , this.drawClock.bind(this));
      });
    },

    startGame : function(){
      this.time = this.$gameTimer.val();
      let counter = 0;

      this.$el.find("#valid").remove();
      if(!this.time*1 || this.time*1 ==0){ return this.$el.append("<label id='valid'>Ingrese una cantidad valida</label>") }

      ajax('/start', {timer : this.time*1000}).then(this.drawClock.bind(this));
    },

    drawClock : function(){
      this.$el.html(`<div id='counter'>Tiempo Restante: ${this.time}</div>`);
      this.$el.append(`<div><input type='button' value='Stop' js-stopgame></div>`);

      this.delegateEvents();
    },

    stopGame: function(){
      ajax('/stop').then(this.reset.bind(this));
    },

    reset : function(data){
      console.log(data);
      console.log("[INFO] Game ended")
      this.$el.html(template);
      this.$gameTimer = this.$el.find("[js-game-timer]");
    },

    updateClock: function(data){
      this.$el.find("#counter").html(`Tiempo Restante: ${data.time}`);
      if(!data.time){ return this.reset() }
    }
  });
});
