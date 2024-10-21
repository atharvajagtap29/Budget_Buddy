export {};

import express, { Request, Response } from "express";
const {
  getAllUsers,
  addRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/records-controller");

const router = express.Router();

router.get(
  "/getRecordsByUserID/:user_id",
  async (req: Request, res: Response) => {
    await getAllUsers(req, res);
  }
);

router.post("/addRecord", async (req: Request, res: Response) => {
  await addRecord(req, res);
});

router.patch(
  "/updateRecord/:record_id",
  async (req: Request, res: Response) => {
    await updateRecord(req, res);
  }
);

router.delete(
  "/deleteRecord/:record_id",
  async (req: Request, res: Response) => {
    await deleteRecord(req, res);
  }
);

module.exports = router;
