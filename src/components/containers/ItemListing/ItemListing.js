import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import ItemListingHeader from './ItemListingHeader'
import Item from './Item'

import { breakpoints, spacing } from '../../../utils/styles'

const ItemListingContainer = styled(`div`)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.lg}px;

  @media (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: ${spacing['2xl']}px;
  }
`

const ItemListing = () => (
  <StaticQuery
    query={graphql`
      query ItemListingQuery {
        items: allStripeSku {
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
    render={({ items }) => {
      console.log(items, 'que pex')
      return (
        <>
          <ItemListingHeader />
          <ItemListingContainer>
            {items.edges.map(({ node: item }) => (
              <Item key={item.id} item={item} />
            ))}
          </ItemListingContainer>
        </>
      )
    }}
  />
)

/* function ItemListing() {
  const ItemListingContainer = styled(`div`)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${spacing.lg}px;

    @media (min-width: ${breakpoints.desktop}px) {
      flex-direction: row;
      flex-wrap: wrap;
      padding: ${spacing['2xl']}px;
    }
  `
  const products = [
    {
      id: '1',
      handle: 'product-1',
      title: 'este es un buen título',
      description: 'una buena descripción para un buen título',
      productType: 'shirt',
      variants: {
        shopifyId: 'cod-01-53-1',
        title: 'este es un buen título',
        price: '10.50',
        availableForSale: 'true',
      },
    },
    {
      id: '2',
      handle: 'product-2',
      title: 'este es un buen título 2',
      description: 'una buena descripción para un buen título 2',
      productType: 'shirt',
      variants: {
        shopifyId: 'cod-01-53-2',
        title: 'este es un buen título 2',
        price: '10.50',
        availableForSale: 'true',
      },
    },
    {
      id: '3',
      handle: 'product-3',
      title: 'este es un buen título 3',
      description: 'una buena descripción para un buen título 3',
      productType: 'shirt',
      variants: {
        shopifyId: 'cod-01-53-3',
        title: 'este es un buen título 3',
        price: '10.50',
        availableForSale: 'true',
      },
    },
  ]
  return (
    <>
      <ItemListingHeader />
      <ItemListingContainer>
        {products.map(product => {
          console.log(products, 'que pex')
          return <Item key={product.id} product={product} />
        })}
      </ItemListingContainer>
    </>
  )
} */

export default ItemListing
