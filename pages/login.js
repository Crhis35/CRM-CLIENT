import React, { useState } from 'react';

import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';

import * as Yup from 'yup';

import Layout from '../components/Layout';

const AUTH_USER = gql`
  mutation authUser($input: AuthInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [message, saveMessage] = useState(null);

  const [authUser] = useMutation(AUTH_USER);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Must provide email'),
      password: Yup.string().required('Must provide password'),
    }),
    onSubmit: async (values) => {
      try {
        const { data } = await authUser({
          variables: {
            input: {
              ...values,
            },
          },
        });
        saveMessage('Auth...');

        setTimeout(() => {
          const { token } = data.authUser;
          localStorage.setItem('token', token);
        }, 1000);

        setTimeout(() => {
          saveMessage(null);
          router.push('/');
        }, 2000);
      } catch (err) {
        saveMessage(err.message.replace('GraphQL error: ', ''));
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
    <div>
      <Layout>
        {message && sendMessage()}
        <h1 className="text-center text-2xl text-white font-light">Login</h1>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mv-4"
              onSubmit={formik.handleSubmit}
            >
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
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                  <p className="font-bold">Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}
              <input
                type="submit"
                className="bg-gray-600 w-full mt-5 p-2 text-white uppercase cursor-pointer hover:bg-gray-800"
                value="Login"
              />
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Login;
