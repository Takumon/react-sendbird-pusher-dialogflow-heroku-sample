import {
  createTextMessage,
  createConfirmMessage,
  createConfirmAirLineMessage,
  createDepartureFormMessage,
  createArrivalToMessage,
  createConfirmationMessage,
  createFlightTicketListMessage,
  reateFlightTicketConfirmMessage,
  createProfileFormMessage,
  createFlightSeatPreConfirmMessage,
  createFlightSeatFormMessage,
  createFlightSeatConfirmMessage,
  createFlightTicketPurchasePreConfirmMessage,
  createFlightTicketPurchaseMessage,
  createFlightTicketPurchasePdfMessage,
} from '../utils/message-converter';


type Bot = {
  question: Question
  setQuestion(question: Question): void
  next({ message, isValid }: { message: Object, isValid: boolean }): void
}

interface Question {
  bot: Bot;
  init(): void;
  next({ message, isValid }: { message: Object, isValid: boolean }): void;
}

export default class FlightTicketRegisterBot implements Bot {
  question: Question;

  next({ message, isValid }: { message: Object, isValid: boolean }) {
    console.log('bot next', message, isValid)
    if (!this.question) {
      return;
    }

    this.question.next({message, isValid });
  }

  setQuestion(q: Question) {
    this.question = q;
  }

  constructor({ registerFunc }: { registerFunc: Function }) {
    class AppStart implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        console.log('セットするbot', bot);
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createConfirmMessage(
          '予約を開始しますか？',
          'チャットから航空機件予約が行えます。航空機件予約を開始しますか？'
        ));
      }


      async next({ message, isValid }: { message: Object, isValid: boolean }) {
        console.log('question next', message, isValid)
        if (isValid) {
          console.log('次の質問をここで決めるのがいいのか？？')
          this.bot.setQuestion(new ConfirmAirLine(this.bot))
        } else {
          console.log('TODO リトライする')
          console.log('TODO 終了するにしても、ボットを外す処理を実行する')
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ));
        }
      }
    };

    class ConfirmAirLine implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createConfirmAirLineMessage());
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new DepartureFrom(this.bot))
      }
    }

    class DepartureFrom implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createDepartureFormMessage());
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new ArrivalTo(this.bot));
      }
    }

    class ArrivalTo implements Question {
      bot: any;
      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createArrivalToMessage());
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new Confirmation(this.bot))
      }
    }

    class Confirmation implements Question {
      bot: Bot;
  
      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createConfirmationMessage(
          // title
          // TODO 入力値をキャッシュして、キャッシュした値を代入
          [
            { name: '国内線・国際線', value: '国際線' },
            { name: 'ご予約人数', value: '1' },
            { name: '出発地域', value: '東京' },
            { name: '到着地域', value: 'サンフランシスコ' },
            { name: 'ご出発の日付', value: '2017/10/31' },
            { name: 'お帰りの日付', value: '2017/11/01' }
          ],
          
        ));
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketList(this.bot))
      }
    }


    class FlightTicketList implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightTicketListMessage(
            [
              {
                'id': '9b8810c8-18e8-4c8f-99ce-2a96915a21ab',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '○',
                    'flightName': 'TL002',
                    'depart': {
                      'airport': 'HND',
                      'airportJapanese': '羽田',
                      'dateTime': '19:45'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '12:00'
                    }
                  }
                ],
                'price': '￥156,000',
                'tax': '￥17,320',
                'time': '9時間 15分',
                'milage': '5130マイル'
              },
              {
                'id': '90ddd38a-0ab1-4e44-bcbf-699fc51d7381',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '△',
                    'flightName': 'TL012',
                    'depart': {
                      'airport': 'NRT',
                      'airportJapanese': '成田',
                      'dateTime': '11:50'
                    },
                    'arrival': {
                      'airport': 'DFW',
                      'airportJapanese': 'ダラス・フォートワース',
      
                      'dateTime': '08:05'
                    }
                  },
                  {
                    'seats': '7',
                    'flightName': 'TL7577',
                    'depart': {
                      'airport': 'DFW',
                      'airportJapanese': 'ダラス・フォートワース',
                      'dateTime': '11:10'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '13:14'
                    }
                  }
                ],
                'price': '￥166,500',
                'tax': '￥17,320',
                'time': '18時間 24分',
                'milage': '7904マイル'
              },
              {
                'id': '9f06f070-d434-4a20-bfec-05a71902ad4f',
                'selectable': true,
                'date': '12/28(木)',
                'routes': [
                  {
                    'seats': '7',
                    'flightName': 'TL7016',
                    'depart': {
                      'airport': 'NRT',
                      'airportJapanese': '成田',
                      'dateTime': '18:45'
                    },
                    'arrival': {
                      'airport': 'LAX',
                      'airportJapanese': 'ロサンゼルス',
                      'dateTime': '11:45'
                    }
                  },
                  {
                    'seats': '7',
                    'flightName': 'TL7556',
                    'depart': {
                      'airport': 'LAX',
                      'airportJapanese': 'ロサンゼルス',
                      'dateTime': '14:00'
                    },
                    'arrival': {
                      'airport': 'SFO',
                      'airportJapanese': 'サンフランシスコ',
                      'dateTime': '15:30'
                    }
                  }
                ],
                'price': '￥199,000',
                'tax': '￥17,320',
                'time': '13時間 45分',
                'milage': '5797マイル'
              }
            ]
        ));
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketListConfirm(this.bot))
      }
    }



    class FlightTicketListConfirm implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(reateFlightTicketConfirmMessage(
          [{
            'id': '9b8810c8-18e8-4c8f-99ce-2a96915a21ab',
            'date': '12/28(木)',
            'routes': [
              {
                'seats': '○',
                'flightName': 'TL002',
                'depart': {
                  'airport': 'HND',
                  'airportJapanese': '羽田',
                  'dateTime': '19:45'
                },
                'arrival': {
                  'airport': 'SFO',
                  'airportJapanese': 'サンフランシスコ',
                  'dateTime': '12:00'
                }
              }
            ],
            'price': '￥156,000',
            'tax': '￥17,320',
            'time': '9時間 15分',
            'milage': '5130マイル',
            'selectable': false,
          }],
        ));
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new ProfileForm(this.bot))
      }
    }



    class ProfileForm implements Question {
      bot: Bot;
  
      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createProfileFormMessage());
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatPreConfirm(this.bot))
      }
    }

    class FlightSeatPreConfirm implements Question {
      bot: any;
      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightSeatPreConfirmMessage())  
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatForm(this.bot))
      }
    }


    class FlightSeatForm implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        registerFunc(createFlightSeatFormMessage())  
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightSeatConfirm(this.bot))
      }
    }


    class FlightSeatConfirm implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        // TODO 登録したデータを元にコメントを生成したい
        const seat = { name: 'E4' };
        registerFunc(createFlightSeatConfirmMessage(seat))  
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchasePreConfirm(this.bot))
      }
    }



    class FlightTicketPurchasePreConfirm implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createFlightTicketPurchasePreConfirmMessage())  
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchaseForm(this.bot))
      }
    }


    class FlightTicketPurchaseForm implements Question {
      bot: any;
      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      init(): void {
        registerFunc(createFlightTicketPurchaseMessage(
          { order:
            {
              price: '￥98,000',
              tax: '￥0',
              amount: '￥98,000',
              date: '12/30(月)',
              confirmed: false,
            }
          },
        ))  
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

        if (!isValid) {
          await registerFunc(createTextMessage(
            'いいえだったので処理を終了します'
          ))  
        }

        this.bot.setQuestion(new FlightTicketPurchasePdf(this.bot))
      }
    }


    class FlightTicketPurchasePdf implements Question {
      bot: Bot;

      constructor(bot: Bot) {
        this.bot = bot;
        this.init();
      }

      async init() {
        await registerFunc(createFlightTicketPurchasePdfMessage(
          { order:
            {
              price: '￥98,000',
              tax: '￥0',
              amount: '￥98,000',
              date: '12/30(月)',
            },
          },
        ))

        await registerFunc(createTextMessage('ご予約を終了いたします。引き続き質問等があればオペレーターが対応いたします。ありがとうございました。'));
      }

      async next({ message, isValid }: { message: Object, isValid: boolean }) {

      }
    }


    this.question = new AppStart(this);
  }
}



