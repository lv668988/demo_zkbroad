import * as types from './mutation-types'

export const addToCart = ({commit}, product) => {
   console.log("commit")
   console.log(commit,product)
  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}
