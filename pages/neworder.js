import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AsignClient from '../components/orders/AsignClient';
import OrderContext from '../context/orders/OrderContext';
import AsignProduct from '../components/orders/AsignProduct';
import Swal from 'sweetalert2';
import SummaryOrder from '../components/orders/SummaryOrder';
import Total from '../components/orders/Total';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_ORDER = gql`
  mutation newOrder($input: OrderInput) {
    newOrder(input: $input) {
      id
    }
  }
`;
const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      id
      order {
        id
        name
        quantity
      }
      client {
        id
        name
        lastName
        email
        phone
      }
      seller
      total
      status
    }
  }
`;

const neworder = () => {
  const router = useRouter();
  const [message, saveMessage] = useState(null);
  const { client, products, total } = useContext(OrderContext);

  const [newOrder] = useMutation(NEW_ORDER, {
    update(cache, { data: { newOrder } }) {
      const { getOrders } = cache.readQuery({
        query: GET_ORDERS,
      });
      cache.writeQuery({
        query: GET_ORDERS,
        data: {
          getOrders: [...getOrders, newOrder],
        },
      });
    },
  });

  const checkout = () => {
    if (products)
      return !products.every((prod) => prod.quantity > 0) ||
        total === 0 ||
        client.length === 0
        ? 'opacity-50 cursor-not-allowed'
        : '';
    return 'opacity-50 cursor-not-allowed';
  };

  const createOrder = async () => {
    const order = products.map(({ __typename, ...product }) => product);
    console.log(order);
    try {
      const { data } = await newOrder({
        variables: {
          input: {
            client: client.id,
            order,
            total,
            status: 'Waiting',
          },
        },
      });
      saveMessage('New Client created');
      Swal.fire('Created', 'Order Successfully sent', 'success');
      setTimeout(() => {
        saveMessage(null);
        router.push('/orders');
      }, 1500);
    } catch (error) {
      saveMessage(error.message.replace('GraphQL error: ', ''));
      setTimeout(() => {
        saveMessage(null);
      }, 2000);
    }
  };

  const sendMessage = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  );

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Created New Order</h1>
      {message && sendMessage()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignClient />
          <AsignProduct />
          <SummaryOrder />
          <Total />
          <button
            type="button"
            className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${checkout()}`}
            onClick={() => createOrder()}
          >
            Register Order
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default neworder;
