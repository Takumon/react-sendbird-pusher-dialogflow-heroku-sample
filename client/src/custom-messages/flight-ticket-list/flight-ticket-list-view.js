
import React, { useState } from 'react';
import Carousel from './carousel';



export default function FlightTicketListView({ m, isConfirm, isAnswer, answer, yesAction, noAction }) {
  console.log(m)
  const {
    title,
    contents,
  } = m.customMessage;




  // TODO ボットなどによる入力チェック
  function validation() {
    return true;
  }


  return isAnswer ? (
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{textAlign: 'right' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'flex-end',
          }}
          answer={answer}
          contents={contents}
        />
      </div>
    ) : isConfirm ? (
      <div>
        <div style={{textAlign: 'left' }} >
          {title && <div>{title}</div>}
        </div>
        <Carousel
          answer={answer}
          contents={contents}
        />
      </div>
    ) : (
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
