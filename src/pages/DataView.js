import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const GET_RECORDS = gql`
  query GetRecords($limit: Int, $offset: Int) {
    getRecords(limit: $limit, offset: $offset) {
      _id
      data
    }
  }
`;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = { lat: 37.7749, lng: -122.4194 }; // Default center (San Francisco)

const DataView = () => {
  const { loading, error, data } = useQuery(GET_RECORDS, {
    variables: { limit: 5, offset: 0 },
  });

  const [locations, setLocations] = useState([]);
  const [records, setRecords] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "123",
  });

  useEffect(() => {
    if (data?.getRecords) {
        let listOfRecords = []
      const fetchCoordinates = async () => {
        const newLocations = await Promise.all(
          data.getRecords.map(async (record) => {
            listOfRecords.push(record)
            const address = record.data?.土地位置建物門牌; // Ensure this is the correct field
            if (!address) return null;

            try {


              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
                )}&key=123`
              );
              const result = await response.json();
              console.log(3, result)

              if (result.status === "OK") {
                const { lat, lng } = result.results[0].geometry.location;
                return { id: record.id, lat, lng };
              }
            } catch (error) {
              console.error("Geocoding error:", error);
            }
            return null;
          }),
          setRecords(listOfRecords)
        );
        console.log(2, newLocations)
        setLocations(newLocations.filter((loc) => loc !== null));
      };

      fetchCoordinates();
    }
  }, [data]);

  console.log('lo',locations)

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!isLoaded) return <p>Loading Maps...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Data Records</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {records> 0 &&
              Object.keys(records[0].data).map((key) => (
                <th key={key} className="border p-2">
                  {key}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id} className="border-b">
              {Object.values(record.data).map((value, index) => (
                <td key={index} className="border p-2">
                  {typeof value === "object" ? JSON.stringify(value, null, 2) : value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-6 mb-4">Map View</h2>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {locations.map((loc) => (
          <Marker key={loc.id} position={{ lat: loc.lat, lng: loc.lng }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default DataView;
