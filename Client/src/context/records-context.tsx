import { createContext, useContext, useState, ReactNode } from "react";

interface FinancialRecord {
  record_id?: string; // Optional ID field
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define the type for the context value
interface FinancialRecordContextType {
  records: FinancialRecord[];
  addRecord: (record: FinancialRecord) => void; // Function to add a record
  // updateRecord: (id: string, newRecord: FinancialRecord) => void;
  // deleteRecord: (id: string) => void;
}

// Create the context with a default value
// Create the context with a default value
const defaultValue: FinancialRecordContextType = {
  records: [],
  addRecord: () => {}, // No-op function as a default
  // updateRecord: () => {}, // No-op function as a default
  // deleteRecord: () => {}, // No-op function as a default
};

export const FinancialRecordsContext =
  createContext<FinancialRecordContextType>(defaultValue);

// Create the provider component
export const FinancialRecordsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  // ADD RECORD {POST API} - Function to add a record
  const addRecord = async (record: FinancialRecord) => {
    try {
        // Add the new record to the state
    const response = await fetch("http://localhost:3001/api/financial-records/addRecord", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
  
      if(response.status === 201) {
          const newRecord = await response.json();
          setRecords((prev) => {
              return [...prev, newRecord];
          });
      } 
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

// Custom hook to use the FinancialRecordsContext
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);
  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
};
