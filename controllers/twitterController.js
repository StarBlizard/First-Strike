const Twitter = require('../services/twitter.js');

module.exports = {
  
  feed(req, res){
    Twitter
      .client
      .get('statuses/user_timeline', { user_id: req.session.passport.user.twitter_id, count : 20 }, (error, tweets, response) => {
        if(error){
          console.log(error);
          return res.status(500).send({
            error : true,
            data  : error
          });
        };
  
        return res.status(200).send(tweets);
      });
  },

  getFriends(req, res){
    Twitter
      .client
      .get('friends/list', { user_id: req.session.passport.user.twitter_id }, (error, friends, response) => {
        return res.send(friends.users);
      } )
  }
};
