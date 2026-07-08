const express = require("express");

const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createTransaction);

router.get("/", protect, getTransactions);

router.put("/:id", protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);
module.exports = router;