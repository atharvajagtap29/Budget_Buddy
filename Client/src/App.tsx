import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { FinancialRecordsProvider } from "./context/records-context";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>This is the Home Page</h1>}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={
            <FinancialRecordsProvider>
              <Dashboard />
            </FinancialRecordsProvider>
          }></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
