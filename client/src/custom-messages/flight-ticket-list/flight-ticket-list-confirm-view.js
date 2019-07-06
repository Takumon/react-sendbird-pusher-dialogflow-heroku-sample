
import React from 'react';
import Carousel from './carousel';



export default function FlightTicketListConfirmView({ m, registerFunc, answer }) {

  const {
    title,
    contents,
  } = m.customMessage;

  // TODO ボットなどによる入力チェック
  function validation() {
    return true;
  }


  return (
    <div>
      <div style={{textAlign: 'left' }} >
        {title && <div>{title}</div>}
      </div>
      <Carousel
        registerFunc={registerFunc}
        answer={answer}
        contents={contents}
      />
    </div>
  );
}
