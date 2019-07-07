
import React from 'react';
import Carousel from './carousel';



export default function FlightTicketListConfirmView({ m, answer }) {

  const {
    title,
    contents,
  } = m.customMessage;


  return (
    <div>
      <div style={{textAlign: 'left' }} >
        {title && <div>{title}</div>}
      </div>
      <Carousel
        answer={answer}
        contents={contents}
      />
    </div>
  );
}
