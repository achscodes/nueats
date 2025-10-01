import React, { createContext, useState } from "react";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  const addToCart = (item, qty = 1) => {
    const normalizedId = Number(item.id);
    setCartItems((prev) => {
      const existing = prev.find((i) => Number(i.id) === normalizedId);
      if (existing) {
        return prev.map((i) =>
          Number(i.id) === normalizedId
            ? { ...i, id: normalizedId, quantity: i.quantity + qty }
            : i
        );
      }
      return [...prev, { ...item, id: normalizedId, quantity: qty }];
    });
  };

 
  const removeFromCart = (id) => {
    const normalizedId = Number(id);
    setCartItems((prev) => prev.filter((i) => Number(i.id) !== normalizedId));
  };


  const clearCart = () => setCartItems([]);

 
  const increaseQty = (id) => {
    const normalizedId = Number(id);
    setCartItems((prev) =>
      prev.map((item) =>
        Number(item.id) === normalizedId
          ? { ...item, id: normalizedId, quantity: item.quantity + 1 }
          : item
      )
    );
  };


  const decreaseQty = (id) => {
    const normalizedId = Number(id);
    setCartItems((prev) =>
      prev.map((item) =>
        Number(item.id) === normalizedId
          ? { ...item, id: normalizedId, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
