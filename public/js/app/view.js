define( require => {

  const Backbone = require("Backbone");

  return Backbone.View.extend({

    initialize : function(){
      const Options = require('./options/view');
      const Players = require('./players/view');
      const Results = require('./results/view');

      this.options = new Options({
        el : "#options"
      });

      this.players = new Players({
        el : "#players"
      });

      this.results = new Results({
        el : "#results"
      });

    }

  });
});
