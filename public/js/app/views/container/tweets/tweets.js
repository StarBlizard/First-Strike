'use strict';
  
define(["Backbone", "css!/js/app/views/container/tweets/tweets"], Backbone => {
  return Backbone.View.extend({
    url     : '/tweets',
    tagName : 'section',
    id      : '#tweets',

  	initialize(){
      require(["../app/collections/tweets", "../app/views/container/tweets/tweet/tweet", "../app/views/container/tweets/newTweet/newTweet"], (tweetsCollection, tweetView, newTweet) => {
        this.childConstructor = tweetView; 
        this.newTweet         = new newTweet();

        this.collection       = new tweetsCollection();
        this.collection.fetch();

        this.collection.on('add', this.render, this);
      });
  	},

    render(model){
      let tweet = new this.childConstructor({
        model : model
      });

      this.$el.append(this.newTweet);
      this.$el.append(tweet.$el);
    }
  });
});
