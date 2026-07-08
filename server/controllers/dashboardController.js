const Transaction = require("../models/Transaction");

const getDashboard = async (req, res) => {
  try {
    console.log("Logged User ID:", req.user._id);

const transactions = await Transaction.find({
  user: req.user._id,
});

console.log("Found Transactions:", transactions);

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((item) => {
      if (item.type === "income") {
        totalIncome += item.amount;
      } else {
        totalExpense += item.amount;
      }
    });

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: transactions.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboard };