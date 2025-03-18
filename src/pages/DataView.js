import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_RECORDS = gql`
  query GetRecords($limit: Int, $offset: Int) {
    getRecords(limit: $limit, offset: $offset) {
      _id
      data
    }
  }
`;

const DataView = () => {
  const [limit] = useState(50);
  const [offset] = useState(0);

  const { loading, error, data } = useQuery(GET_RECORDS, {
    variables: { limit, offset },
  });

  if (loading) return <p className="text-gray-500 text-center mt-4">Loading data...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">Error: {error.message}</p>;

  const records = data?.getRecords || [];

  // Extract all possible keys from `record.data`
  const columns = records.length > 0 
    ? Array.from(new Set(records.flatMap((record) => Object.keys(record.data || {})))) 
    : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Records</h2>

      {/* Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-3">ID</th>
              {columns.map((col) => (
                <th key={col} className="border p-3 text-left capitalize">
                  {col.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr
                key={record.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border p-3">{record.id}</td>
                {columns.map((col) => (
                  <td key={col} className="border p-3">
                    {record.data?.[col] !== undefined
                      ? record.data[col]
                      : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataView;
