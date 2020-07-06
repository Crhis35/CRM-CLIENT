import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const NEW_PRODUCT = gql`
  mutation newProduct($input: ProductInput) {
    newProduct(input: $input) {
      id
      name
      price
      quantity
    }
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

const Newproduct = () => {
  const router = useRouter();
  const [newProduct] = useMutation(NEW_PRODUCT, {
    update(cache, { data: newProduct }) {
      const { getProducts } = cache.readQuery({ query: GET_PRODUCTS });

      cache.writeQuery({
        query: GET_PRODUCTS,
        data: {
          getProducts: [...getProducts, newProduct],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      quantity: '',
      price: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('You must provide a name'),
      quantity: Yup.number()
        .required('You must provide a quantity')
        .positive('Only positive numbers')
        .integer('Must be an integer'),
      price: Yup.number()
        .required('You must provide a quantity')
        .positive('Only positive numbers'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const { name, quantity, price } = values;
      try {
        const { data } = await newProduct({
          variables: {
            input: {
              name,
              quantity,
              price,
            },
          },
        });
        console.log(data);
        Swal.fire('Created', 'Created Successfully', 'success');
        router.push('/products');
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Create New Product</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="name"
                placeholder="Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.name}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="quantity"
                type="number"
                placeholder="Quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
            </div>
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.quantity}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="number"
                placeholder="Price"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
            </div>
            {formik.touched.price && formik.errors.price ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.price}</p>
              </div>
            ) : null}
            <input
              type="submit"
              className="bg-gray-800 w-full p-2 text-white font-bold uppercase hover:bg-gray-900"
              value="Add Product"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Newproduct;
