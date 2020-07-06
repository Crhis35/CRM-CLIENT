import React, { useContext } from 'react';
import Layout from '../Layout';
import OrderContext from '../../context/orders/OrderContext';
import SummaryProduct from './SummaryProduct';

const SummaryOrder = () => {
  const { products } = useContext(OrderContext);
  console.log(products);
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        3.- Ajustando cantidades del Proucto
      </p>
      {products ? (
        <>
          {products.map((prod) => (
            <SummaryProduct key={prod.id} product={prod} />
          ))}
        </>
      ) : (
        <p className="mt-5 text-sm">No Products Yet!</p>
      )}
    </>
  );
};

export default SummaryOrder;
