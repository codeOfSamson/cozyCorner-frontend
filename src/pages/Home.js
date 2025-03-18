import DataTable from "../components/DataTable";
import DataView from "./DataView";

const Home = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">CSV Data Dashboard</h1>
      {/* <DataTable /> */}
      <DataView />
    </div>
  );
};

export default Home;
