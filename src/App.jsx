import { useState } from "react";
import { Layout, MRU, MRUA, FreeFall } from "./components";

function App() {
  const [currentTopic, setCurrentTopic] = useState("MRU");

  const renderCalculator = () => {
    switch (currentTopic) {
      case "MRU":
        return <MRU />;
      case "MRUA":
        return <MRUA />;
      case "FREE_FALL":
        return <FreeFall />;
      default:
        return <MRU />;
    }
  };

  return (
    <Layout headerProps={{ currentTopic, setCurrentTopic }}>
      {renderCalculator()}
    </Layout>
  );
}

export default App;
