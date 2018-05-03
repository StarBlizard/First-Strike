define( require => {

  const Backbone   = require("Backbone");
  const ResultView = require("./result/view");
  const ajax       = require("utils/ajax");
  const ordinals   = require("utils/ordinals");

  return Backbone.View.extend({

    events : {
      "click [js-reset-score]" : "reset"
    },

    initialize : function(){
      const template = require("text!./template.html");
      const io       = require("utils/socket");

      this.template = _.template(template);
      this.$el.html(this.template());
      this.delegateEvents();

      this.$tbody   = this.$el.find('tbody');
      this.$winning = this.$el.find('[js-results-winning]');

      ajax('/getScores').then( this.render.bind(this) );

      io.on("game:ENDED" , this.render.bind(this));
    },

    render : function(data){
      console.log(this.$winning)
      this.$winning.text(`Winning: ${data[0].id}`);
      this.$tbody.empty();
      data.forEach( (data, place) => {
        data.place = ordinals(place+1, true);
        let result = new ResultView({ data });
        this.$tbody.append(result.el);
      });
    },

    reset : function(){
      ajax('/reset').then( () => {
        this.$winning.empty();
        this.$tbody.empty();
      });
    }
  });
});
