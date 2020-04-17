const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query GET_SKUS {
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
  `)

  if (result.errors) {
    throw result.errors
  }

  result.data.allStripeSku.edges.forEach(({ node }) => {
    createPage({
      path: `/product/${node.id}`,
      component: path.resolve(`src/templates/ItemPageTemplate.js`),
      context: node,
    })
  })
}
