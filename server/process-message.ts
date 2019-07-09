import Dialogflow from 'dialogflow';
import getWeatherInfo from './weather';

// You can find your project ID in your Dialogflow agent settings
const projectId = 'weather-bot-swcbpp'; // https://dialogflow.com/docs/agents#settings
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL || '',
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY || '',
  },
};

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

export default async function processMessage(message: string, pusher: any) {
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
    const [ { queryResult } ] = await sessionClient.detectIntent(request);

    // If the intent matches 'detect-city'
    if (queryResult.intent.displayName === 'detect-city') {
      const city = queryResult.parameters.fields['geo-city'].stringValue;

      // fetch the temperature from openweather map
      const temperature = await getWeatherInfo(city);
      return pusher.trigger(
        'bot', 'bot-response',
        { message: `The weather is ${city} is ${temperature}°C` }
      );
    }

    const fetchedMessage = queryResult.fulfillmentText;
    console.log('Server = ', fetchedMessage);
    return pusher.trigger('bot', 'bot-response', { message: fetchedMessage });

  } catch (err) {
    console.error('ERROR:', err);
  }
}
