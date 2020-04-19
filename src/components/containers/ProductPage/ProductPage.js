import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import ProductImagesMobile from './ProductImagesMobile'
import ProductImagesDesktop from './ProductImagesDesktop'
import ProductSpecs from './ProductSpecs'
import ProductForm from './ProductForm'
import BackLink from './BackLink'

import { breakpoints, spacing } from '../../../utils/styles'

const ProductPageRoot = styled('div')`
  padding-bottom: ${spacing.md}px;

  @media (min-width: ${breakpoints.desktop}px) {
    align-items: center;
    display: flex;
    justify-content: center;
    min-height: calc(100vh - 110px);
    padding: ${spacing.xl}px;
    width: 100%;
  }
`

const Container = styled(`div`)`
  @media (min-width: ${breakpoints.desktop}px) {
    align-items: flex-start;
    display: flex;
  }
`

const Details = styled(`div`)`
  position: relative;

  @media (min-width: ${breakpoints.desktop}px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: -${spacing.xl}px;
    max-width: 400px;
    min-height: 490px;
  }
`

class ProductPage extends Component {
  componentDidMount() {
    const images = this.props.product.product.metadata.img
    this.props.setCurrentProductImages(images)
  }

  render() {
    const {
      product,
      product: { id, product: productData },
    } = this.props

    const { img } = productData.metadata

    const images = [{ img }]

    const variants = [
      {
        shopifyId: 1,
        title: "SM",
        price: "2.50",
        availableForSale: "true"
        
      },
      {
        shopifyId: 2,
        title: "MD",
        price: "90.50",
        availableForSale: "false"
        
      },
      {
        shopifyId: 3,
        title: "LG",
        price: "32.50",
        availableForSale: "true"
        
      },
      {
        shopifyId: 4,
        title: "XL",
        price: "22.50",
        availableForSale: "true"
        
      },
      {
        shopifyId: 5,
        title: "XXL",
        price: "10.50",
        availableForSale: "true"
        
      },
      {
        shopifyId: 6,
        title: "3XL",
        price: "12.50",
        availableForSale: "false"
        
      }
    ]

    console.log(images, 'IMAGEEEEEEES')

    const {
      isDesktopViewport,
      productImageFeatured,
      toggleProductImagesBrowser,
    } = this.props

    return (
      <ProductPageRoot>
        <Container>
          {!isDesktopViewport ? (
            <ProductImagesMobile
              images={images}
              imageOnClick={toggleProductImagesBrowser}
            />
          ) : (
            <ProductImagesDesktop
              images={images}
              imageOnClick={toggleProductImagesBrowser}
              imageFeatured={productImageFeatured}
            />
          )}
          <Details>
            <BackLink>Regresar</BackLink>
            <ProductSpecs product={product} />
            <ProductForm id={id} variants={variants} product={product}/>
          </Details>
        </Container>
      </ProductPageRoot>
    )
  }
}

ProductPage.propTypes = {
  product: PropTypes.object.isRequired,
  productImagesBrowserStatus: PropTypes.string.isRequired,
  toggleProductImagesBrowser: PropTypes.func.isRequired,
  setCurrentProductImages: PropTypes.func.isRequired,
  productImageFeatured: PropTypes.object,
  isDesktopViewport: PropTypes.bool,
}

export default ProductPage
