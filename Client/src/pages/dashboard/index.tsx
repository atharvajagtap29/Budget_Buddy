import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import FinancialRecordForm from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import { useFinancialRecords } from "../../context/records-context";
import "./financial-record.css";

const Dashboard = () => {
  const { user } = useUser();
  const { getRecords, records } = useFinancialRecords();

  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are your finances</h1>
      <FinancialRecordForm />
      {records.length > 0 ? <FinancialRecordList /> : <p>No records found.</p>}
    </div>
  );
};

export default Dashboard;
