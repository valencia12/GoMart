import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';

import { navigate } from 'gatsby';


import StoreContext, { defaultStoreContext } from '../../../context/StoreContext';

import InterfaceContext, {
  defaultInterfaceContext
} from '../../../context/InterfaceContext';

import Header from './Header';
import ContributorArea from '../ContributorArea';
import PageContent from './PageContent';
import ProductImagesBrowser from '../ProductPage/ProductImagesBrowser';
import Cart from '../Cart';
import SiteMetadata from '../../common/shared/SiteMetadata';


import { breakpoints, colors } from '../../../utils/styles';

// Import Futura PT typeface
import '../../../fonts/futura-pt/Webfonts/futurapt_demi_macroman/stylesheet.css';


const globalStyles = css`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
    color: ${colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.375;
    margin: 0 auto;
  }
`;

const Viewport = styled(`div`)`
  width: 100%;
`;

export default class Layout extends React.Component {
  desktopMediaQuery;

  state = {
    interface: {
      ...defaultInterfaceContext,
      toggleCart: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            contributorAreaStatus:
              state.interface.isDesktopViewport === false &&
              state.interface.contributorAreaStatus === 'open'
                ? 'closed'
                : state.interface.contributorAreaStatus,
            cartStatus:
              this.state.interface.cartStatus === 'open' ? 'closed' : 'open'
          }
        }));
      },
      toggleProductImagesBrowser: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImagesBrowserStatus: img ? 'open' : 'closed',
            productImageFeatured: img
              ? img
              : state.interface.productImageFeatured
          }
        }));
      },
      featureProductImage: img => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            productImageFeatured: img
          }
        }));
      },
      setCurrentProductImages: images => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            currentProductImages: images,
            productImageFeatured: null
          }
        }));
      },
      toggleContributorArea: () => {
        this.setState(state => ({
          interface: {
            ...state.interface,
            contributorAreaStatus: this.toggleContributorAreaStatus()
          }
        }));
      }
    },
    
    store: {
      ...defaultStoreContext,
      addVariantToCart: (product, quantity) => {
        if (product.variant === '' || !quantity) {
          console.error('Both a size and quantity are required.');
          return;
        }

        this.setState(state => ({
          store: {
            ...state.store,
            adding: true
          }
        }));

        console.log(product, "PRODUCTO A CARRITO")
        product.quantity = parseInt(quantity)
        this.state.store.checkout.lineItems.push(product)
        this.setState(state => ({
          store: {
            ...state.store,
            adding: false
          }
        }));
          
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        console.log(lineItemID, "SKU")
        this.state.store.checkout.lineItems = this.state.store.checkout.lineItems.filter((value, index) => {
          return value.id != lineItemID
        })
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        
        let indexElement = this.state.store.checkout.lineItems.findIndex(
          obj => obj.id === lineItemID
        )
        this.state.store.checkout.lineItems[indexElement].quantity = quantity
      }
    }
  };

  async initializeCheckout() {
    // Check for an existing cart.
    const isBrowser = typeof window !== 'undefined';
    const existingCheckoutID = isBrowser
      ? localStorage.getItem('shopify_checkout_id')
      : null;

    const setCheckoutInState = checkout => {
      if (isBrowser) {
        localStorage.setItem('shopify_checkout_id', checkout.id);
      }

      this.setState(state => ({
        store: {
          ...state.store,
          checkout
        }
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = id => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID && existingCheckoutID !== 'null') {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem('shopify_checkout_id', null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  async loadContributor(nickname) {
    
  }

  componentDidMount() {
    // Observe viewport switching from mobile to desktop and vice versa
    const mediaQueryToMatch = `(min-width: ${breakpoints.desktop}px)`;

    this.desktopMediaQuery = window.matchMedia(mediaQueryToMatch);
    this.desktopMediaQuery.addListener(this.updateViewPortState);

    this.updateViewPortState();

    // Make sure we have a Shopify checkout created for cart management.
    this.initializeCheckout();

    // Mounting Layout on 'callback' page triggers user 'loading' flag
    if (this.props.location.pathname === '/callback/') {
      this.setState(state => ({
        user: { ...state.user, loading: true }
      }));
    }

    // Make sure to set user.profile when a visitor reloads the app
    if (this.props.location.pathname !== '/callback/') {
      this.setUserProfile();
    }
  }

  componentDidUpdate(prevProps) {
    // Set user.profile after redirection from '/callback/' to '/'
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      prevProps.location.pathname === '/callback/'
    ) {
      this.setState(state => ({
        interface: {
          ...state.interface,
          contributorAreaStatus: 'open'
        }
      }));
      this.setUserProfile();
    }

    // Close product modal window after navigating "back"
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      prevProps.location.pathname.startsWith('/product/')
    ) {
      this.setState(state => ({
        interface: {
          ...state.interface,
          productImagesBrowserStatus: 'closed'
        }
      }));
    }
  }

  componentWillUnmount = () => {
    this.desktopMediaQuery.removeListener(this.updateViewPortState);
  };

  updateViewPortState = e => {
    this.setState(state => ({
      interface: {
        ...state.interface,
        isDesktopViewport: this.desktopMediaQuery.matches
      }
    }));
  };

  setUserProfile = () => {
    
  };

  toggleContributorAreaStatus = () => {
    if (this.state.interface.contributorAreaStatus === 'initial') {
      return this.state.interface.isDesktopViewport ? 'closed' : 'open';
    } else {
      return this.state.interface.contributorAreaStatus === 'closed'
        ? 'open'
        : 'closed';
    }
  };

  render() {
    const { children, location } = this.props;

    return (
      <>
        <Global styles={globalStyles} />
        <SiteMetadata />
        
          <StoreContext.Provider value={this.state.store}>
            <InterfaceContext.Provider value={this.state.interface}>
              <InterfaceContext.Consumer>
                {({
                  isDesktopViewport,
                  cartStatus,
                  toggleCart,
                  contributorAreaStatus,
                  toggleContributorArea,
                  productImagesBrowserStatus,
                  currentProductImages,
                  featureProductImage,
                  productImageFeatured,
                  toggleProductImagesBrowser
                }) => (
                  <>
                    <Header
                      isDesktopViewport={isDesktopViewport}
                      productImagesBrowserStatus={productImagesBrowserStatus}
                    />
                    <Viewport>
                      <Cart
                        isDesktopViewport={isDesktopViewport}
                        status={cartStatus}
                        toggle={toggleCart}
                        contributorAreaStatus={contributorAreaStatus}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                      />

                      <ContributorArea
                        location={location}
                        status={contributorAreaStatus}
                        toggle={toggleContributorArea}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                      />

                      <PageContent
                        cartStatus={cartStatus}
                        contributorAreaStatus={contributorAreaStatus}
                        isDesktopViewport={isDesktopViewport}
                        productImagesBrowserStatus={productImagesBrowserStatus}
                        location={location}
                      >
                        {children}
                      </PageContent>

                      {currentProductImages.length > 0 && (
                        <ProductImagesBrowser
                          featureProductImage={featureProductImage}
                          images={currentProductImages}
                          position={productImagesBrowserStatus}
                          imageFeatured={productImageFeatured}
                          toggle={toggleProductImagesBrowser}
                          isDesktopViewport={isDesktopViewport}
                        />
                      )}
                    </Viewport>
                  </>
                )}
              </InterfaceContext.Consumer>
            </InterfaceContext.Provider>
          </StoreContext.Provider>
        
      </>
    );
  }
}
