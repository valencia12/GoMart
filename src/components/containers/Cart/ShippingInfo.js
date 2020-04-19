import React, { Component } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

import { MdKeyboardArrowDown, MdInfo } from 'react-icons/md';

import { colors, radius, spacing, defaultFontStack } from '../../../utils/styles';

const ShippingInfoRoot = styled(`div`)`
  background: #f5f5f5;
  border-radius: ${radius.default}px;
  margin: ${spacing.sm}px 0;
  padding: ${spacing.sm}px ${spacing.md}px;
`;

const Intro = styled(`p`)`
  color: ${colors.text};
  cursor: pointer;
  display: block;
  font-family: ${defaultFontStack};
  font-size: 0.95rem;
  margin: 0;
  position: relative;
  text-align: left;
`;

const on = keyframes`
  to {
    opacity: 1;
  }
`;

const Details = styled(Intro)`
  animation: ${on} 1s ease forwards;
  cursor: default;
  display: none;
  margin-top: ${spacing.xs}px;
  opacity: 0;
  transition: 0.5s;

  .expanded & {
    display: block;
  }
`;

const ArrowIcon = styled(MdKeyboardArrowDown)`
  color: ${colors.lilac};
  height: 26px;
  position: relative;
  stroke-width: 1px;
  transform: translateY(-10%) rotate(0);
  transition: 0.5s;
  vertical-align: top;
  width: 26px;

  .expanded & {
    transform: translateY(-10%) rotate(180deg);
  }

  ${Intro}:hover & {
    color: ${colors.accent};
  }
`;

const InfoIcon = styled(MdInfo)`
  color: ${colors.lilac};
  margin-right: ${spacing['2xs']}px;
  vertical-align: middle;
`;

class ShippingInfo extends Component {
  state = {
    detailsVisible: false
  };

  toggle = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible });
  };

  render() {
    const { detailsVisible } = this.state;

    return (
      <ShippingInfoRoot className={detailsVisible ? 'expanded' : ''}>
        <Intro role="button" onClick={this.toggle}>
          <InfoIcon />
          Recuerda que también puedes realizar donaciones a nuestro servicio
          delivery, con esto estarás ayudando a que las donaciones de productos
          puedan llegar a más personas.
          . <ArrowIcon />
        </Intro>
        <Details>
          Proporcionamos las donaciones de productos a las personas que estén
          cerca del negocio que tenga esos productos, pero hay personas que quedan
          muy lejos y no tienen los medios para poder llegar a uno de estos 
          establecimientos, por lo que con tu ayuda pagamos un servicio de delivery para 
          llegar a ellos.
        </Details>
      </ShippingInfoRoot>
    );
  }
}

export default ShippingInfo;
