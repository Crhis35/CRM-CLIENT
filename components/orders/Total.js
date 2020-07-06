import React, { useContext } from 'react';
import OrderContext from '../../context/orders/OrderContext';

const Total = () => {
  const { total } = useContext(OrderContext);

  return (
    <div className="flex items-centet mt-5 justify-between bg-white p-3 border-solid border-2 border-gray-400">
      <h2 className="text-gray-800 text-lg">Total Amount: </h2>
      <p className="text-gray-800 mt-0">$ {total}</p>
    </div>
  );
};

export default Total;
