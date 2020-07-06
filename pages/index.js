import Layout from "../components/Layout";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Client from "../components/Client";

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

const Index = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS_USER);
  const router = useRouter();

  if (loading) return "Cargando....";

  if (!data.getClientsBySeller) {
    return router.push("/login");
  }

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clients</h1>
        <Link href="/newclient">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
            New Client
          </a>
        </Link>
        <div className="overflow-x-scroll">
          <table className="table-auto shadow-md mt-10 w-full w-lg">
            <thead className="bg-gray-800">
              <tr className="text-white">
                <th className="w-1/5 py-2">Name</th>
                <th className="w-1/5 py-2">Enterprise</th>
                <th className="w-1/5 py-2">Email</th>
                <th className="w-1/5 py-2">Delete</th>
                <th className="w-1/5 py-2">Edit</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {data.getClientsBySeller.map((client) => (
                <Client key={client.id} client={client} />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
};
export default Index;
