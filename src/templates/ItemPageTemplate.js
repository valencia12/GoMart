import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import ProductPage from '../components/containers/ProductPage'
import InterfaceContext from '../context/InterfaceContext'

const ItemPageTemplate = props => {
  console.log(props, 'HOLAAAAA')
  const {
    pageContext,
    pageContext: { id, price, product },
  } = props

  const { name, metadata } = product

  const { description: fullDescription, img, wear } = metadata
  console.log(img, 'AAAAAAAAAAAAAAAA')
  const {
    siteMetadata: { siteUrl },
  } = props.data.site

  const canonical = `${siteUrl}`

  return (
    <InterfaceContext.Consumer>
      {({
        isDesktopViewport,
        productImagesBrowserStatus,
        productImageFeatured,
        toggleProductImagesBrowser,
        setCurrentProductImages,
      }) => (
        <>
          <Helmet>
            <title>{name}</title>

            <meta name='description' content={fullDescription} />
            <link rel='canonical' href={canonical} />

            <meta property='og:url' content={`${siteUrl}/product/${id}`} />
            <meta property='og:locale' content='en' />
            <meta property='og:title' content={name} />
            <meta property='og:site_name' content='Gatsby Swag Store' />
            <meta property='og:description' content={fullDescription} />

            {/* TODO: add the image */}
            <meta property='og:image' content={`${siteUrl}${img}`} />
            <meta property='og:image:alt' content={name} />
            <meta property='og:image:width' content='600' />
            <meta property='og:image:height' content='600' />

            <meta name='twitter:card' content='summary' />
            <meta name='twitter:site' content='@gatsbyjs' />
          </Helmet>
          <ProductPage
            product={pageContext}
            isDesktopViewport={isDesktopViewport}
            productImagesBrowserStatus={productImagesBrowserStatus}
            productImageFeatured={productImageFeatured}
            toggleProductImagesBrowser={toggleProductImagesBrowser}
            setCurrentProductImages={setCurrentProductImages}
          />
        </>
      )}
    </InterfaceContext.Consumer>
  )
}

export default ItemPageTemplate

export const query = graphql`
  query {
    site {
      siteMetadata {
        siteUrl
        title
        description
      }
    }
  }
`
