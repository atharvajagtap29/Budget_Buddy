export {};

const FinancialRecordModel = require("../schemas/records-schema");
import { Request, Response } from "express";

// Get all the records for a specific user
const getAllUsers = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  try {
    const records = await FinancialRecordModel.find({ userId: user_id });

    if (records.length === 0) {
      return res.status(404).json({ status: 404, message: "No records found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Successfully retrieved records",
      data: records,
    });
  } catch (err) {
    console.error(`Error retrieving records: ${err}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

// add a financial record
const addRecord = async (req: Request, res: Response) => {
  try {
    // fetch the record
    const newFinancialRecordBody = req.body;

    // console.log(
    //   `User ID ::: ${req.body.userId} :::: description :::: ${req.body.description} `
    // );

    // console.log(newFinancialRecordBody);

    // if empty body
    if (!newFinancialRecordBody) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid request body" });
    }

    //   add the record to the schema
    const newRecord = new FinancialRecordModel(newFinancialRecordBody);
    //   save the schema back to the db
    const savedRecord = await newRecord.save();

    return res.status(201).json({
      status: 201,
      message: "Record added successfully",
      data: savedRecord,
    });
  } catch (err) {
    console.error(`Error adding record: ${err}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const updateRecord = async (req: Request, res: Response) => {
  try {
    // fetch the record
    const id = req.params.record_id;
    const updatedFinancialRecordBody = req.body;

    const updatedRecord = await FinancialRecordModel.findByIdAndUpdate(
      id,
      updatedFinancialRecordBody,
      { new: true }
    );

    if (!updateRecord) {
      return res.status(404).json({ status: 404, message: "Record not found" });
    }

    // if found record and updated return updated record
    return res.status(200).json({
      status: 200,
      message: "Record updated successfully",
      data: updatedRecord,
    });
  } catch (err) {
    console.error(`Error updating record: ${err}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteRecord = async (req: Request, res: Response) => {
  try {
    // fetch the record
    const id = req.params.record_id;
    const deletedRecord = await FinancialRecordModel.findByIdAndDelete(id);
    if (!deletedRecord) {
      return res.status(404).json({ status: 404, message: "Record not found" });
    }
    // if found record and deleted return success message
    return res.status(200).json({
      status: 200,
      message: "Record deleted successfully",
      data: deletedRecord,
    });
  } catch (err) {
    console.error(`Error deleting record: ${err}`);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllUsers,
  addRecord,
  updateRecord,
  deleteRecord,
};
