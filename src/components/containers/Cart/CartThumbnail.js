import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from '@emotion/styled';
import Image from 'gatsby-image';

import { colors, radius } from '../../../utils/styles';

const CartThumbnailRoot = styled('img')`
  border: 1px solid ${colors.brandLight};
  border-radius: ${radius.default}px;
  height: 36px;
  width: 36px;
`;



export default props => (
  <StaticQuery
    query={graphql`
       {
        allStripeSku {
          edges {
            node {
              id
              price
              product {
                name
                metadata {
                  description
                  img
                  wear
                }
              }
            }
          }
        }
      }
    `}
    render={({ allStripeSku: { edges } }) => {
      const images = edges
        .map(({ node }) => node.product.metadata.img)
        .reduce((acc, val) => acc.concat(val), []);

      return <CartThumbnailRoot src={images}  />;
    }}
  />
);
