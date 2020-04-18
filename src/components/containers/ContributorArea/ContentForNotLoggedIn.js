import React from 'react';
import styled from '@emotion/styled';
import { GoMarkGithub } from 'react-icons/go';


import { Button as BaseButton } from '../../common/shared/Buttons';
import { Heading, SectionHeading, Text } from './AreaTypography';
import { spacing, animations } from '../../../utils/styles';

const ContentForGuestRoot = styled(`div`)`
  animation: ${animations.simpleEntry};
  position: relative;
`;

const FirstHeading = styled(Heading)`
  padding-right: ${spacing.lg}px;
  margin-right: 15px;
`;

const Button = styled(BaseButton)`
  margin: ${spacing.lg}px 0 ${spacing.xl}px 0;
`;

const ContentForGuest = () => (
  <ContentForGuestRoot>
    <SectionHeading>Para Contribuyentes</SectionHeading>
    <FirstHeading>
      Consigue descuentos!
    </FirstHeading>
    <Text>
      Tu ayuda es esencial para los salvadoreños con menos recursos en estos momentos,
      por eso las diferentes tiendas asociadas a GoMart! te lo agradecen brindadote increibles
      descuentos
    </Text>
    
    
    <SectionHeading>Para próximos contribuyentes</SectionHeading>
    <Heading>Nunca has donado con GoMart?</Heading>
    <Text>
      Con cualquier producto que compres para tu consumo estas ayudando a un negocio
      afectado por está situación y también puedes hacer una donación para personas
      que mas lo necesitan.
    </Text>

    <Button
      inverse
      href=""
    >
      Explora nuestras opciones
    </Button>
  </ContentForGuestRoot>
);

export default ContentForGuest;
