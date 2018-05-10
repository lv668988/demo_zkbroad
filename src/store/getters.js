export const cartProducts = state => {
  return state.cart.added.map(({id, quantity}) => {
    const product = state.products.all.find(p => p.id === id)
    console.log("获取vues中的值");
    console.log({
      title: product.title,
      price: product.price,
      quantity
    });
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}
