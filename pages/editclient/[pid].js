import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useQuery, gql, useMutation } from '@apollo/client';

const GET_CLIENT_BY_ID = gql`
  query getClientById($id: ID!) {
    getClientById(id: $id) {
      name
      lastName
      email
      enterprise
      phone
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation updateClient($id: ID!, $input: ClientInput) {
    updateClient(id: $id, input: $input) {
      name
      email
    }
  }
`;

const EditClient = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { data, loading, error } = useQuery(GET_CLIENT_BY_ID, {
    variables: {
      id,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);

  const schemaValidation = Yup.object({
    name: Yup.string().required('Must provide name'),
    lastName: Yup.string().required('Must provide Last Name'),
    enterprise: Yup.string().required('Must provide Enterprise'),
    email: Yup.string().email('Invalid email').required('Must provide email'),
  });

  if (loading) return 'Cargando...';

  const { getClientById } = data;

  const updateClientById = async (values) => {
    const { name, lastName, email, enterprise, phone } = values;
    try {
      const { data } = await updateClient({
        variables: {
          id,
          input: {
            name,
            lastName,
            email,
            enterprise,
            phone,
          },
        },
      });

      Swal.fire('Updated!', 'Client updated', 'success');
      router.push('/');
    } catch (error) {
      console.log(error.message);
      // console.log('Efectivo');
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
            initialValues={getClientById}
            onSubmit={(values) => {
              updateClientById(values);
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
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="lastName"
                      type="text"
                      placeholder="lastName"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lastName}
                    />
                  </div>

                  {props.touched.lastName && props.errors.lastName ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.lastName}</p>
                    </div>
                  ) : null}

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="empresa"
                    >
                      enterprise
                    </label>

                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="enterprise"
                      type="text"
                      placeholder="Enterprise"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.enterprise}
                    />
                  </div>

                  {props.touched.enterprise && props.errors.enterprise ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.enterprise}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.email}
                    />
                  </div>

                  {props.touched.email && props.errors.email ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.email}</p>
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
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.phone}
                    />
                  </div>

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

export default EditClient;
