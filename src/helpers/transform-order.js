export const transformOrder = (arrOrder, index = 0) => ({
  price: arrOrder[0],
  quantity: arrOrder[1],
  amount: arrOrder[2],
  index: index,
});
