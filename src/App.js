import { ApolloProvider } from "@apollo/client";
import client from "./apollo/client";
import Home from "./pages/Home";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-gray-50 p-8">
        <Home />
      </div>
    </ApolloProvider>
  );
};

export default App;
