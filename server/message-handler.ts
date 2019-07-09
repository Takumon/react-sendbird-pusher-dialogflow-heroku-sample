import SendBird from 'sendbird';
import {
  connect,
  deleteMessage,
  enterChannel,
  getMessage,
  openChannel,
  // updateMessage,
  sendMessage,
  sendFileMessage,
} from './sendbird';
import { toCustom } from './dialog-controllers/utils/message-converter';
import FlightTicketRegisterBot from './dialog-controllers/flight-ticket-register/bot';
import { DATA_TYPE } from './dialog-controllers/flight-ticket-register/types';

const APP_ID: string = process.env.REACT_APP_APP_ID || '';
const CHANNEL_ID: string = process.env.REACT_APP_CHANNEL_ID || '';
const EVENT_HANDLER_ID: string = uuid4();

export default class SendBirdHandler {
  private openedChannel: any;
  private sb: any;
  private attachedBot: any;
  private pusher: any;

  constructor(userId: string, pusher: any) {
    // init＿ SendBird
    // this.openedChannel = undefined;
    // this.sb = undefined;
    // this.attachedBot = undefined;
    this.pusher = pusher;
    (async () => {
      const sb = new SendBird({appId: APP_ID});
      const user = await connect(sb, userId);
      await connect(sb, userId);
      const openedChannel = await openChannel(sb, CHANNEL_ID);
      await enterChannel(openedChannel);

      this.sb = sb;
      this.openedChannel = openedChannel;

      const ChannelHandler = new sb.ChannelHandler();
      ChannelHandler.onMessageReceived = async (_: any, message: any) => {
        console.log('onMessageReceived', message);
      };
      ChannelHandler.onMessageUpdated = async (_: any, message: any) => {
        console.log('onMessageUpdated', message);
      };
      ChannelHandler.onMessageDeleted = (_: any, messageId: any) => {
        console.log('onMessageDeleted', messageId);
      };

      console.log('addChannelHandler');
      sb.addChannelHandler(EVENT_HANDLER_ID, ChannelHandler);

      const bot = new FlightTicketRegisterBot(this.registerBotMessage.bind(this), {
        [DATA_TYPE.CONDITON_NUMBER_OF_PASSENGERS]: 1,
        [DATA_TYPE.CONDITON_DEPARTURE_DATE]: '2019/07/04',
        [DATA_TYPE.CONDITON_ARRIVAL_DATE]: '2019/07/14',
      });
      this.attachedBot = bot;
      await bot.execQuestion();
    })();

  }

  public async registerBotMessage(messageText: string) {
    console.log('registerBotMessage', messageText);
    const message = await sendMessage(this.openedChannel, messageText);
    this.pushMessageToClient(message);
  }

  public async registerFunc(messageText: string) {
    console.log('registerFunc', messageText);
    const message: any = await sendMessage(this.openedChannel, messageText);
    this.pushMessageToClient(message);
    const hasNext = await this.attachedBot.reactionToAnwer(toCustom(message));
    console.log('reactionToAnwerの結果', hasNext);
  }

  public async getMessages() {
    const currentQuery = this.openedChannel.createPreviousMessageListQuery();
    const fetchedMessages: any = await getMessage(currentQuery);
    return fetchedMessages;
  }

  public destroy() {
    console.log('removeChannelHandler');
    this.sb.removeChannelHandler(EVENT_HANDLER_ID);
  }

  private pushMessageToClient(message: any) {
    this.pusher.trigger(
      'bot',
      'message-added',
      { message }
    );
  }
}

function uuid4() {
  let d = new Date().getTime();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
    // tslint:disable-next-line: no-bitwise
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    // tslint:disable-next-line: no-bitwise
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}
