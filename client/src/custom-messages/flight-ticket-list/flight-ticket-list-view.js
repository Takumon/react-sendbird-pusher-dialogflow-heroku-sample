
import React from 'react';
import Carousel from './carousel';

export default function FlightTicketListView({ m, registerFunc }) {

  const {
    title,
    contents,
  } = m.customMessage;

  return (
    <>
      {title && <div>{title}</div>}
      <Carousel
        registerFunc={registerFunc}
        contents={contents}
      />
    </>
  );
}
