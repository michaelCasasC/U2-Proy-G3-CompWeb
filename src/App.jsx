import { Routes, Route } from "react-router-dom";
import { Layout } from "./components";
import { Home, Team, Contact, News, Calculator } from "./pages";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/calculator/*" element={<Calculator />} />
      </Routes>
    </Layout>
  );
}

export default App;
