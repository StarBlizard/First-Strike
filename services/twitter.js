const Twitter = require('twitter');
const nconf   = require('nconf');

module.exports = {
  
  start(){
    this.client = new Twitter({
      consumer_key        : nconf.get('twitter:consumerKey'),
      consumer_secret     : nconf.get('twitter:consumerSecret'),
      access_token_key    : nconf.get('twitter:accessToken'),
      access_token_secret : nconf.get('twitter:accessSecretToken')
    }); 
  }

};
