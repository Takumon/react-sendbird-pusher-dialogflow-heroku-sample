import React from 'react';
import styled from '@emotion/styled';
import CarouselCell from './carousel-cell';

const CarouselContainer = styled.div`
  font-size: 0.9em;
  text-align: left;
  white-space: nowrap;
  width: 85%;
  overflow: auto;
`;

export default function Carousel({ contents, registerFunc }) {
  try {
    return (
      <CarouselContainer>
        {contents.map((props, idx) => <CarouselCell {...props} registerFunc={registerFunc} key={idx} />)}
      </CarouselContainer>
    )
  } catch (e) {
    console.log(e);
    return (
      <CarouselContainer>
        <p>Could not parse carousel content</p>
      </CarouselContainer>
    )
  }
}
