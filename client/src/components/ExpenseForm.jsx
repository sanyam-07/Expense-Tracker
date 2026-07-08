import { useEffect, useState } from "react";
import API from "../services/api";

function ExpenseForm({
  darkMode,
  onTransactionAdded,
  editingTransaction,
  setEditingTransaction,
}) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title,
        amount: editingTransaction.amount,
        category: editingTransaction.category,
        type: editingTransaction.type,
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.title ||
      !formData.amount ||
      !formData.category
    ) {
      alert("Please fill all fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (editingTransaction) {
        await API.put(
          `/transactions/${editingTransaction._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("Transaction Updated Successfully");
      } else {
        await API.post("/transactions", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Transaction Added Successfully");
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        type: "expense",
      });

      if (setEditingTransaction) {
        setEditingTransaction(null);
      }

      if (onTransactionAdded) {
        onTransactionAdded();
      }

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`shadow p-5 rounded-lg mt-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={formData.amount}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className={`w-full border p-2 mb-3 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        {editingTransaction
          ? "Update Transaction"
          : "Add Transaction"}
      </button>
    </form>
  );
}

export default ExpenseForm;