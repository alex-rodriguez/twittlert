# Twittler (Twitter + alert)

A node app that sends you a DM when certain users send tweets within a list of keywords. Can be useful, for instance, to get alerts when your local trafic authority tweet trafic warnings, or to get weather alerts ... Just use your imagination.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

node and a Twitter developer account.

```
https://developer.twitter.com
```

### Installing

Before running the app, you need to create a .env file in the project's root folder.
That .env file is going to contain the environment variables with the keys and access tokens needed by the Twitter API. Also your Twitter user id for receiving the alert DMs:

```
CONSUMER_KEY=1234566789
CONSUMER_SECRET=123456789
ACCESS_TOKEN=123456789
ACCESS_TOKEN_SECRET=123456789
USER_ID=123456789
```

You'll also need to configure accounts.json with the Twitter accounts that are going to be tracked and their keywords. If no keywords are supplied all tweets from that user will be sent as an alert to you. You can get the Twitter ids from user names and viceversa here https://tweeterid.com/

```
{
  "configs": [
    {
      "name": "Descriptive name",
      "id": "twitter account id",
      "keywords": ["keyword1", "keyword2", ...]
    },
    ...
  ]
}
```

Now you can run:
```
npm install
node index.js
```

## Contributing

Please feel free to do a pull request with changes, bugfixes, ...

## Authors

Alex Rodriguez

## License

This project is licensed under the MIT License