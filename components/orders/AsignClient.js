import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';

const GET_CLIENTS_USER = gql`
  query getClientsBySeller {
    getClientsBySeller {
      id
      name
      lastName
      email
      enterprise
    }
  }
`;

const AsignClient = () => {
  const [client, setClient] = useState([]);

  const { addClient } = useContext(OrderContext);

  const { data, loading, error } = useQuery(GET_CLIENTS_USER);

  useEffect(() => {
    addClient(client);
  }, [client]);

  const selectClient = (client) => {
    setClient(client);
  };

  if (loading) return 'Loading...';
  const { getClientsBySeller } = data;
  return (
    <>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1.- Asignar Cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={getClientsBySeller}
        onChange={(option) => selectClient(option)}
        getOptionValue={(options) => options.id}
        getOptionLabel={(options) => options.name}
        placeholder="Select Client"
        noOptionsMessage={() => 'Theres no results'}
      />
    </>
  );
};

export default AsignClient;
