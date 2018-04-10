define(["Backbone", "views/sidebar/friends/friend/friend", "collections/friends"], (Backbone, Friend, collection) => {
  return Backbone.View.extend({
  	initialize(opc){ 
      this.collection = new collection();
      this.collection.fetch();
      this.collection.on('add', this.render, this);
  	},

    render(model){
      let friend = new Friend({
        model : model.attributes
      });
      this.$el.append(friend.$el);
    }
  });
});
