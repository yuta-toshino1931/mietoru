import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import BudgetActual from "./pages/BudgetActual";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/mietoru" element={<Dashboard />} />
          <Route path="/mietoru/roadmap" element={<Roadmap />} />
          <Route path="/mietoru/budget-actual" element={<BudgetActual />} />
          <Route path="/mietoru/support" element={<Support />} />
          <Route path="/mietoru/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
