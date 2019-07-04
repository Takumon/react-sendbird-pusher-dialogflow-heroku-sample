export const CUSTOM_MESSAGE_TYPE = {
  TEXT: 'TEXT',
  CONFIRM: 'CONFIRM',
  CONFIRM_AIR_LINE: 'CONFIRM_AIR_LINE',
  DEPARTURE_FORM: 'DEPERTURE_FORM',
  ARRIVAL_FORM: 'ARRIVAL_FORM',
  LINK: 'LINK',
  IMAGE: 'IMAGE',
  CHOICE: 'CHOICE',
  OTHER: 'OTHER',
  ANSWER: 'ANSWER',
  CONFIRMATION: 'CONFIRMATION',
  FLIGHT_TICKET_LIST: 'FLIGHT_TICKET_LIST',
  PROFILE_FORM: 'PROFILE_FORM',
  FLIGHT_SEAT_FORM: 'FLIGHT_SEAT_FORM',
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

export function createDepartureFormMessage(text, questionType) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.DEPARTURE_FORM,
    questionType,
    text,
  });
}

export function createArrivalFormMessage(text, questionType) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.ARRIVAL_FORM,
    questionType,
    text,
  });
}





export function createConfirmMessage(title, text) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM,
    title,
    text,
  });
}

export function createConfirmAirLineMessage(title, text) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRM_AIR_LINE,
    title,
    text,
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

export function createConfirmationMessage(title, text, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.CONFIRMATION,
    title,
    text,
    contents,
  });
}

export function createFlightTicketListMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_LIST,
    title,
    contents,
  });
}

export function createProfileFormMessage(title) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.PROFILE_FORM,
    title,
  });
}

export function createFlightSeatMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_SEAT_FORM,
    title,
    contents,
  });
}


export function createFlightTicketPurchaseMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_FORM,
    title,
    contents,
  });
}


export function createFlightTicketPurchasePdfMessage(title, contents) {
  return JSON.stringify({
    type: CUSTOM_MESSAGE_TYPE.FLIGHT_TICKET_PURCHASE_PDF,
    title,
    contents,
  });
}
