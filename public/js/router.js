define( require => {

  const Backbone = require("Backbone");

  return Backbone.Router.extend({
    initialize : function(){
      let Dashboard = require("static/view");

      new Dashboard({
        el : "#dashboard"
      });
    }
  });
});
