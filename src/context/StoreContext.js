import React from 'react'

export const defaultStoreContext = {
  isCartOpen: false,
  adding: false,
  checkout: { lineItems: [] },
  products: [],
  shop: {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
}

const StoreContext = React.createContext(defaultStoreContext)

export const withStoreContext = Component => {
  return props => (
    <StoreContext.Consumer>
      {context => <Component {...props} storeContext={context} />}
    </StoreContext.Consumer>
  )
}

export default StoreContext
