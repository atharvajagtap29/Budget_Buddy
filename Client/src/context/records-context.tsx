import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAuth } from "@clerk/clerk-react"; // Adjust this import based on your authentication setup

// Define the FinancialRecord interface
export interface FinancialRecord {
  record_id?: string; // Optional ID field
  userId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
}

// Define the context type
interface FinancialRecordContextType {
  records: FinancialRecord[];
  getRecords: (userId: string) => void; // Function to fetch records for a user
  addRecord: (record: FinancialRecord) => void; // Function to add a record
  updateRecord: (record_id: string, newRecord: FinancialRecord) => void; // Function to update a record
  deleteRecord: (record_id: string) => void; // Function to delete a record
}

// Default context value
const defaultValue: FinancialRecordContextType = {
  records: [],
  getRecords: () => {},
  addRecord: () => {},
  updateRecord: () => {},
  deleteRecord: () => {},
};

export const FinancialRecordsContext =
  createContext<FinancialRecordContextType>(defaultValue);

// Provider component
export const FinancialRecordsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { userId } = useAuth(); // Get userId from Clerk context
  const [records, setRecords] = useState<FinancialRecord[]>([]);

  // Fetch records when userId changes
  useEffect(() => {
    if (userId) {
      getRecords(userId);
    }
  }, [userId]);

  const getRecords = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/financial-records/getRecordsByUserID/${userId}`
      );

      if (response.status === 200) {
        const data = await response.json();
        setRecords(data.data); // Update state with fetched records
      } else {
        console.error(`Failed to fetch records: ${response.status}`);
      }
    } catch (err) {
      console.error(`Error fetching records: ${err}`);
    }
  };

  const addRecord = async (record: FinancialRecord) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/financial-records/addRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }
      );

      if (response.status === 201) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord.data]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateRecord = async (
    record_id: string,
    newRecord: FinancialRecord
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/financial-records/updateRecord/${record_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecord),
        }
      );

      if (response.status === 200) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) =>
            record.record_id === record_id ? updatedRecord.data : record
          )
        );
      }
    } catch (err) {
      console.error(`Error updating record: ${err}`);
    }
  };

  const deleteRecord = async (record_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/financial-records/deleteRecord/${record_id}`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        setRecords((prev) =>
          prev.filter((record) => record.record_id !== record_id)
        );
      }
    } catch (err) {
      console.error(`Error deleting record: ${err}`);
    }
  };

  return (
    <FinancialRecordsContext.Provider
      value={{ records, getRecords, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordsContext.Provider>
  );
};

// Custom hook to use the FinancialRecordsContext anywhere in the app
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordsContext);
  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
};
