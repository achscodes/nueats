import React, { createContext, useState } from "react";
export const OrderContext = createContext();

const OrderProvider = ({ children }) => {

  const [currentOrder, setCurrentOrder] = useState(null);

  return (
    <OrderContext.Provider value={{ currentOrder, setCurrentOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
