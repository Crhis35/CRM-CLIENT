import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Order from '../components/Order';

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

const Orders = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);
  if (loading) return 'Cargando...';
  // console.log(error);
  const { getOrders } = data;

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
        <Link href="/neworder">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">
            New Order
          </a>
        </Link>
        {getOrders ? (
          getOrders.map((ord) => <Order key={ord.id} order={ord} />)
        ) : (
          <p className="mt-5 text-center text-2xl">No there</p>
        )}
      </Layout>
    </div>
  );
};
export default Orders;
