import React, { useContext, useState, useEffect } from 'react';
import OrderContext from '../../context/orders/OrderContext';

const SummaryProduct = ({ product, product: { name, price } }) => {
  const [quantity, setQuantity] = useState(0);

  const { productQuantity, updateTotal } = useContext(OrderContext);
  useEffect(() => {
    updateQuantity();
    updateTotal();
  }, [quantity]);

  const updateQuantity = () => {
    const newProd = { ...product, quantity: Number(quantity) };
    productQuantity(newProd);
  };

  return (
    <div className="md:flex md:justify-between md:items-center mt-5">
      <div className="md:w-2/4 mb-2 md:mb-0">
        <p className="text-sm">{name}</p>
        <p>${price}</p>
      </div>

      <input
        className="shadow apperance-none border rounded w-full py-2 px-3 text-gray-700 leadin-tight focus:outline-none focus:shadow-outline md:ml-4"
        type="number"
        placeholder="Quantity"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
      />
    </div>
  );
};

export default SummaryProduct;
