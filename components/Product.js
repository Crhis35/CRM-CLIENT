import React from 'react';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import Router from 'next/router';

const DELETE_PROD = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

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

const Product = ({ prod: { id, name, quantity, price } }) => {
  const [deleteProduct] = useMutation(DELETE_PROD, {
    update(cache) {
      const { getProducts } = cache.readQuery({
        query: GET_PRODUCTS,
      });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: getProducts.filter((prod) => prod.id !== id),
        },
      });
    },
  });

  const confirmDelete = () => {
    Swal.fire({
      title: 'Are you sure to delete this client?',
      text: 'This action is could not undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'No, Cancel',
    }).then(async (result) => {
      if (result.value) {
        try {
          // Deleted by ID
          const { data } = await deleteProduct({
            variables: {
              id,
            },
          });

          Swal.fire('Deleted!', data.deleteProduct, 'success');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const confirmEdit = () => {
    Router.push({
      pathname: '/editproduct/[id]',
      query: { id },
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2">{name}</td>
      <td className="border px-4 py-2">{quantity}</td>
      <td className="border px-4 py-2">${price}</td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-red-800 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmDelete()}
        >
          Deleted
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 ml-2"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </td>
      <td className="border px-4 py-2">
        <button
          type="button"
          className="flex justify-center items-center bg-green-600 py-2 px-4 w-full text-white rounded text-xs uppercase font-bold"
          onClick={() => confirmEdit()}
        >
          Edit
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-4 h-4 ml-2"
          >
            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

export default Product;
