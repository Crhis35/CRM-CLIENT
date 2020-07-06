import React, { useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';

const GET_PRODUCTS = gql`
  query getProducts {
    getProducts {
      id
      name
      price
      quantity
    }
  }
`;

const AsignProduct = () => {
  const [products, setProduct] = useState([]);

  const { data, loading, error } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    addProduct(products);
  }, [products]);

  const { addProduct } = useContext(OrderContext);

  const selectProd = (prod) => {
    setProduct(prod);
  };

  if (loading) return 'Cargando...';
  const { getProducts } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2.- Asignar Prouctos
      </p>
      <Select
        className="mt-3"
        options={getProducts}
        isMulti={true}
        onChange={(option) => selectProd(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) =>
          `${options.name} - ${options.quantity} Avaliables`
        }
        placeholder="Select Products"
        noOptionsMessage={() => 'Theres no results'}
      />
    </>
  );
};

export default AsignProduct;
