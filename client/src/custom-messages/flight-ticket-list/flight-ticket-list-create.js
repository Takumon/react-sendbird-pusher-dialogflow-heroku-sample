
import React from 'react';
import styled from '@emotion/styled';
import {
  Button,
} from 'antd';
import {
  createFlightTicketListMessage,
} from '../../utils/message-converter';

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: stretch;
`;

const ButtonArea = styled.div`

`;


export default function FlightTicketListCreate({ registerFunc }) {

  function action() {
    const messageStr = createFlightTicketListMessage(
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
    );
    registerFunc(messageStr);
  }

  return (
    <Container>
      <ButtonArea>
        <Button
          onClick={action}
          type="primary"
        >CREATE FLIGHT TICKET LIST MESSAGE</Button>
      </ButtonArea>
    </Container>
  );
}

