const Twit = require('twit')
const fs = require('fs');
require('dotenv').config()

// Converts to upper case and removes diacritics.
const normalizeText = text => {
  return text.toUpperCase().
    normalize('NFD').
    replace(/[\u0300-\u036f]/g, "")
}

// Gets an array of user's keywords by userId 
const accounts = JSON.parse(fs.readFileSync('accounts.json', 'utf8'));
let keywordsByAccount = {}
accounts.configs.forEach(account => {
  keywordsByAccount[account.id] = account.keywords.map(keyword => normalizeText(keyword))
})

// Config twit with API keys.
const twit = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

// Sends DM to you
const sendDM = tweet => {
  twit.post(
    "direct_messages/events/new",
    {
      "event":
      {
        "type": "message_create", 
        "message_create": 
          {
            "target": {"recipient_id": process.env.USER_ID},
            "message_data": {"text": `[Twittlert] ${tweet.user.name} (@${tweet.user.screen_name}): ${tweet.text}`}
          }
      }
    },
    function(err,data,response){
      console.log(`${tweet.user.name} : ${tweet.text}`)
    }
  );
}

var accountIds = Object.keys(keywordsByAccount)
var stream = twit.stream('statuses/filter', {follow: accountIds})

stream.on('tweet', (tweet) => {
  if (accountIds.includes(tweet.user.id_str)){
    const keywords = keywordsByAccount[tweet.user.id_str]
    if (keywords.length > 0){
      keywordsByAccount[tweet.user.id_str].forEach(keyword => {
        const normalizedTweet = normalizeText(tweet.text)
  
        if (normalizedTweet.includes(keyword)){         
          sendDM(tweet)
        }
      })
    }
    else{
      sendDM(tweet)
    }
  }
})