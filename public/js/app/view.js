define( require => {

  const Backbone = require("Backbone");

  return Backbone.View.extend({

    initialize : function(){
      const Options = require('./options/view');
      const Players = require('./players/view');

      this.options = new Options({
        el : "#options"
      });

      this.players = new Players({
        el : "#players"
      });
    }

  });
});
