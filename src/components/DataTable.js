import { useQuery } from "@apollo/client";
import { GET_ALL_RECORDS } from "../services/graphql";

const DataTable = () => {
  const { loading, error, data } = useQuery(GET_ALL_RECORDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Data Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Source</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {data.getRecords.map((record) => (
            <tr key={record._id} className="border">
              <td className="p-2">{record.source}</td>
              <td className="p-2">{new Date(record.timestamp).toLocaleString()}</td>
              <td className="p-2 text-xs">{JSON.stringify(record.data)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
