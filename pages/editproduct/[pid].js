import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const GET_PRODUCT = gql`
  query getProductById($id: ID!) {
    getProductById(id: $id) {
      name
      quantity
      price
    }
  }
`;
const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $input: ProductInput) {
    updateProduct(id: $id, input: $input) {
      name
      quantity
      price
    }
  }
`;

const EditProduct = () => {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery(GET_PRODUCT, {
    variables: {
      id,
    },
  });

  const schemaValidation = Yup.object({
    name: Yup.string().required('You must provide a name'),
    quantity: Yup.number()
      .required('You must provide a quantity')
      .positive('Only positive numbers')
      .integer('Must be an integer'),
    price: Yup.number()
      .required('You must provide a quantity')
      .positive('Only positive numbers'),
  });
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  if (loading) return 'Cargando...';
  if (!data) return 'Action no allowed';

  const { getProductById } = data;

  const updateProductById = async ({ name, quantity, price }) => {
    try {
      const { data } = await updateProduct({
        variables: {
          id,
          input: {
            name,
            quantity,
            price,
          },
        },
      });
      Swal.fire('Updated!', 'Product updated', 'success');
      router.push('/products');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Edit Client</h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={schemaValidation}
            enableReinitialize
            initialValues={getProductById}
            onSubmit={(values) => {
              updateProductById(values);
            }}
          >
            {(props) => {
              // console.log(props);
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
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
                      type="text"
                      placeholder="Name"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.name}
                    />
                  </div>

                  {props.touched.name && props.errors.name ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.name}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.quantity}
                    />
                  </div>

                  {props.touched.quantity && props.errors.quantity ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.quantity}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.price}
                    />
                  </div>

                  {props.touched.price && props.errors.price ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.price}</p>
                    </div>
                  ) : null}

                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Edit Client"
                  />
                </form>
              );
            }}
          </Formik>
           
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
