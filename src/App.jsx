import { useState } from "react";
import { Layout } from "./components";
import { Home, Team, Contact, News, Calculator } from "./pages";

function App() {
  const [currentPage, setCurrentPage] = useState("HOME");

  const renderPage = () => {
    switch (currentPage) {
      case "HOME":
        return <Home />;
      case "TEAM":
        return <Team />;
      case "CONTACT":
        return <Contact />;
      case "NEWS":
        return <News />;
      case "CALCULATOR":
        return <Calculator />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout headerProps={{ currentPage, setCurrentPage }}>
      {renderPage()}
    </Layout>
  );
}

export default App;
