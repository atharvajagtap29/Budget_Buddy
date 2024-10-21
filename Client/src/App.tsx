import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { FinancialRecordsProvider } from "./context/records-context";
import {
  SignedIn,
  SignedOut,
  UserButton,
  RedirectToSignIn,
} from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <div className="app-container dark-theme">
        <div className="navbar">
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link to="/auth"> Sign In</Link>
          </SignedOut>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
