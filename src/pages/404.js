import React from 'react';
import { Heading, Text, TextContainer } from '../components/common/shared/Typography';

const NotFoundPage = () => (
  <TextContainer
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Heading>Whoops - That Page Doesn’t Exist (404)</Heading>
    <Text>
      Looks like the page you requested either doesn’t exist or has been moved.
      
    </Text>
    
  </TextContainer>
);

export default NotFoundPage;
