import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import API from "../services/api";

function TransactionList({
  darkMode,
  refresh,
  onTransactionDeleted,
  setEditingTransaction,
}) {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchTransactions();

      if (onTransactionDeleted) {
        onTransactionDeleted();
      }

      alert("Transaction Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Delete Transaction");
    }
  };

  const filteredTransactions = transactions.filter((item) => {
    const matchesSearch = (item.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const csvData = filteredTransactions.map((item) => ({
    Title: item.title,
    Amount: item.amount,
    Category: item.category,
    Type: item.type,
  }));

  return (
    <div
      className={`p-5 rounded-lg shadow mt-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
        <h2 className="text-2xl font-bold">
          Transactions
        </h2>

        <CSVLink
          data={csvData}
          filename="transactions.csv"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          Export CSV
        </CSVLink>
      </div>

      <input
        type="text"
        placeholder="Search Transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full border p-2 mb-4 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      />

      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className={`w-full border p-2 mb-4 rounded ${
          darkMode
            ? "bg-gray-700 text-white border-gray-600"
            : "bg-white text-black"
        }`}
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
        <option value="Shopping">Shopping</option>
        <option value="Travel">Travel</option>
        <option value="Bills">Bills</option>
      </select>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr
              className={
                darkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }
            >
              <th className="border p-2">Title</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((item) => (
                <tr key={item._id}>
                  <td className="border p-2">
                    {item.title}
                  </td>

                  <td className="border p-2">
                    ₹{item.amount}
                  </td>

                  <td className="border p-2">
                    {item.category}
                  </td>

                  <td className="border p-2 capitalize">
                    {item.type}
                  </td>

                  <td className="border p-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setEditingTransaction(item)
                        }
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-4"
                >
                  No Transactions Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;