export const CUSTOM_MESSAGE_TYPE = {
  TEXT: 'TEXT',
  CONFIRM: 'CONFIRM',
  CONFIRM_AIR_LINE: 'CONFIRM_AIR_LINE',
  DEPARTURE_FORM: 'DEPERTURE_FORM',
  ARRIVAL_FORM: 'ARRIVAL_FORM',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  ANSWER: 'ANSWER',
  CONFIRMATION: 'CONFIRMATION',
  FLIGHT_TICKET_LIST: 'FLIGHT_TICKET_LIST',
  FLIGHT_TICKET_ANSWER: 'FLIGHT_TICKET_ANSWER',
  FLIGHT_TICKET_CONFIRM: 'FLIGHT_TICKET_CONFIRM',
  PROFILE_FORM: 'PROFILE_FORM',
  PROFILE_ANSWER: 'PROFILE_ANSWER',
  FLIGHT_SEAT_PRE_CONFIRM: 'FLIGHT_SEAT_PRE_CONFIRM', 
  FLIGHT_SEAT_FORM: 'FLIGHT_SEAT_FORM',
  FLIGHT_SEAT_CONFIRM: 'FLIGHT_SEAT_CONFIRM',
  FLIGHT_TICKET_PURCHASE_PRE_CONFIRM: 'FLIGHT_TICKET_PURCHASE_PRE_CONFIRM',
  FLIGHT_TICKET_PURCHASE_FORM: 'FLIGHT_TICKET_PURCHASE_FORM',
  FLIGHT_TICKET_PURCHASE_PDF: 'FLIGHT_TICKET_PURCHASE_PDF',
};


export function toCustom(m) {
  m.customMessage = JSON.parse(m.message);
  return m;
}

export function toOriginal(m) {
  const result = Object.assign({}, m);
  delete result.customMessage;
  return result;
}

/*****************
 * Type definition
 *****************/

export function createTextMessage(text) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.TEXT,
    text,
  });
}

export function createAnswerMessage(text, questionType) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.ANSWER,
    questionType,
    text,
  });
}

export function createDepartureFormMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM,
    text: '出発の地域はどこでしょうか',
  });
}

export function createArrivalToMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM,
    text: '到着値は地域はどこでしょうか',
  });
}

export function createFlightSeatConfirmMessage(seat) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_CONFIRM,
    text: '以下の座席でよろしいですか。',
    seat,
  });
}


export function createFlightSeatPreConfirmMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_PRE_CONFIRM,
    text: 'お座席を指定しますか？',
  });
}




export function createConfirmMessage(title, text) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM,
    title,
    text,
  });
}

export function createConfirmAirLineMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE,
    title: '国内線/国際線',
    text: '国内線と国際線のどちらですか？',
  });
}


export function createLinkMessage(text, link) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.LINK,
    text,
    link,
  });
}

export function createImageMessage(link, description, alt) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.IMAGE,
    link,
    description,
    alt,
  });
}

export function createConfirmationMessage(contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRMATION,
    title: 'フライト予約内容',
    text: '以下の内容でフライトを検索しますか？',
    contents,
  });
}

export function createFlightTicketListMessage(contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST,
    title: 'ご希望のフライトを選択してください',
    contents,
  });
}

export function reateFlightTicketConfirmMessage(contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST,
    title: 'ご希望のフライトは以下で間違いないでしょうか。',
    contents,
  });
}



export function createFlightTicketAnswerMessage(title, contents, questionType) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_ANSWER,
    title,
    contents,
    questionType,
  });
}


export function createFlightTicketConfirmMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_CONFIRM,
    title,
    contents,
  });
}


export function createProfileFormMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.PROFILE_FORM,
    title: '次にお客様の情報をお伺いします。',
  });
}

export function createProfileAnswerMessage(formData) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.PROFILE_ANSWER,
    questionType: CUSTOM_MESSAGE_TYPE.PROFILE_FORM,
    contents: formData,
  });
}

export function createFlightSeatFormMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM,
    title: '座席を指定してください。',
  });
}


export function createFlightTicketPurchasePreConfirmMessage() {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PRE_CONFIRM,
    text: '引き続き購入手続きを行いますか?',
  });
}



export function createFlightTicketPurchaseMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM,
    title,
    contents,
  });
}


export function createFlightTicketPurchasePdfMessage(contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF,
    title: 'お支払いが完了しました。お客様のe-ticketです。',
    contents,
  });
}
