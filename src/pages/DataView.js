import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_RECORDS = gql`
  query GetRecords($source: String, $search: String) {
    records(source: $source, search: $search) {
      id
      source
      timestamp
      data
    }
  }
`;

const DataView = () => {
  const [sourceFilter, setSourceFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { loading, error, data } = useQuery(GET_RECORDS, {
    variables: { source: sourceFilter || null, search: searchTerm || null },
  });

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Records</h2>

      {/* Filter Controls */}
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search data..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Filter by source..."
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Data Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Source</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {data.records.map((record) => (
            <tr key={record.id} className="border-b">
              <td className="border p-2">{record.source}</td>
              <td className="border p-2">{new Date(record.timestamp).toLocaleString()}</td>
              <td className="border p-2">
                {typeof record.data === "object"
                  ? JSON.stringify(record.data, null, 2)
                  : record.data}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataView;
