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
    },
 });
});
