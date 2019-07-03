const Dialogflow = require('dialogflow');
const Pusher = require('pusher');
const getWeatherInfo = require('./weather');

// You can find your project ID in your Dialogflow agent settings
const projectId = 'weather-bot-swcbpp'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  },
};

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = async message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  try {
    // throw a message to DialogFlow
    const [ { queryResult } ] = await sessionClient.detectIntent(request)


    // If the intent matches 'detect-city'
    if (queryResult.intent.displayName === 'detect-city') {
      const city = queryResult.parameters.fields['geo-city'].stringValue;

      // fetch the temperature from openweather map
      const temperature = await getWeatherInfo(city);
      const message = `The weather is ${city} is ${temperature}°C`;
      return pusher.trigger('bot', 'bot-response', { message });
    }

    const message = queryResult.fulfillmentText;
    console.log('Server = ', message)
    return pusher.trigger('bot', 'bot-response', { message });

  } catch(err) {
    console.error('ERROR:', err);
  }
};

module.exports = processMessage;
