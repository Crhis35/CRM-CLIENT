import React, { useEffect } from 'react';
import Layout from '../components/Layout';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

const BEST_SELLERS = gql`
  query bestSellers {
    bestSellers {
      seller {
        name
      }
      total
    }
  }
`;

const Bestsellers = () => {
  const { data, loading, error, startPolling, stopPolling } = useQuery(
    BEST_SELLERS
  );

  useEffect(() => {
    startPolling(1000);

    return () => {
      stopPolling();
    };
    3;
  }, [startPolling, stopPolling]);

  if (loading) return 'Cargando...';

  const { bestSellers } = data;

  const sellerGraph = [];
  bestSellers.map((seller, idx) => {
    sellerGraph[idx] = {
      ...seller.seller[0],
      Total: seller.total,
    };
  });

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Best Sellers</h1>
      <ResponsiveContainer width={'99%'} height={550}>
        <BarChart
          className="mt-10"
          width={600}
          height={500}
          data={sellerGraph}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#3182CE" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
};

export default Bestsellers;
