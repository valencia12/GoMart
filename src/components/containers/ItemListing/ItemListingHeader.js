import React from 'react'
import styled from '@emotion/styled'

import { breakpoints, colors, fonts, spacing } from '../../../utils/styles'

const ItemListingHeaderRoot = styled(`header`)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40em;
  padding: ${spacing.lg}px;
  text-align: center;
`

const Title = styled(`h1`)`
  color: ${colors.brandDark};
  font-family: ${fonts.heading};
  font-size: 2.4rem;
  letter-spacing: -0.02em;
  line-height: 1;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 3rem;
  }
`

const Intro = styled(`p`)`
  color: ${colors.text};
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  margin-top: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`

const ItemListingHeader = () => (
  <ItemListingHeaderRoot>
    <Title>Consigue lo mejor de GoMart</Title>
    <Intro>
      Son tiempos difíciles, es cuando más tenemos que mostrar nuestra solidaridad. Los productos 
      en GoMart son de negocios de la pequeña y mediana empresa así que puedes comprar lo que 
      necesites a la vez que impulsas la economía de El Salvador. Ocupa nuestro sistema de donaciones,
      todo lo que compres se le llevará a personas de escasos recursos que necesitan de tu ayuda, en especial
      en esta situación.
    </Intro>
  </ItemListingHeaderRoot>
)

export default ItemListingHeader
