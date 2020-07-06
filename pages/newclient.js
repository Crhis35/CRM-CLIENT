import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';

const NEW_CLIENT = gql`
  mutation newClient($input: ClientInput) {
    newClient(input: $input) {
      id
      name
      lastName
      enterprise
      email
      phone
    }
  }
`;

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

const newclient = () => {
  const router = useRouter();
  const [message, saveMessage] = useState(null);

  const [newClient] = useMutation(NEW_CLIENT, {
    update(cache, { data: { newClient } }) {
      //Obtener objeto de cache a actualizar
      const { getClientsBySeller } = cache.readQuery({
        query: GET_CLIENTS_USER,
      });

      // Reescribir el cache (el cache nunca se debe modificar)
      cache.writeQuery({
        query: GET_CLIENTS_USER,
        data: {
          getClientsBySeller: [...getClientsBySeller, newClient],
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      enterprise: '',
      email: '',
      phone: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Must provide name'),
      lastName: Yup.string().required('Must provide Last Name'),
      enterprise: Yup.string().required('Must provide Enterprise'),
      email: Yup.string().email('Invalid email').required('Must provide email'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await newClient({
          variables: {
            input: {
              ...values,
            },
          },
        });
        saveMessage('New Client created');

        setTimeout(() => {
          saveMessage(null);
          router.push('/');
        }, 1500);
      } catch (error) {
        saveMessage(error.message.replace('GraphQL error: ', ''));
        setTimeout(() => {
          saveMessage(null);
        }, 2000);
      }
    },
  });
  const sendMessage = () => (
    <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
      <p>{message}</p>
    </div>
  );
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light cursor-pointer">
        New Client
      </h1>
      {message && sendMessage()}
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
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="lastName"
                placeholder="Last Name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
            </div>
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.lastName}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="enterprise"
              >
                Enterprise
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="enterprise"
                type="enterprise"
                placeholder="Enterprise"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.enterprise}
              />
            </div>
            {formik.touched.enterprise && formik.errors.enterprise ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.enterprise}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="Phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
            </div>
            <input
              type="submit"
              className="bg-gray-800 w-full p-2 text-white font-bold uppercase hover:bg-gray-900"
              value="Register Client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default newclient;
