const Transaction = require("../models/Transaction");

// Create Transaction
const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create({
      user: req.user._id,
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      type: req.body.type,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    transaction.title =
      req.body.title || transaction.title;

    transaction.amount =
      req.body.amount || transaction.amount;

    transaction.category =
      req.body.category || transaction.category;

    transaction.type =
      req.body.type || transaction.type;

    const updatedTransaction =
      await transaction.save();

    res.status(200).json(updatedTransaction);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};