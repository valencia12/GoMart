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
    <Intro>Introducción paloma</Intro>
  </ItemListingHeaderRoot>
)

export default ItemListingHeader
