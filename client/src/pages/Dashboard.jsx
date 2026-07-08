import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";
import ExpenseChart from "../components/ExpenseChart";
import MonthlyExpenseChart from "../components/MonthlyExpenseChart";

function Dashboard() {
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();
    const [editingTransaction, setEditingTransaction] =
        useState(null);
    const [darkMode, setDarkMode] = useState(
        JSON.parse(localStorage.getItem("darkMode")) || false
    );
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);
    const fetchDashboard = async () => {
        try {
            const token = localStorage.getItem("token");

            const res = await API.get("/dashboard", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, [refresh]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const refreshDashboard = () => {
        setRefresh((prev) => !prev);
    };
    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/login");
    };

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Loading...
                </h1>
            </div>
        );
    }

    return (
        <div
            className={`p-4 md:p-8 min-h-screen ${darkMode
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
                }`}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h1 className="text-2xl md:text-4xl font-bold">
                    Expense Tracker Dashboard
                </h1>

                <div className="flex gap-2 mt-4 md:mt-0">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
                    >
                        {darkMode ? "☀️ Light" : "🌙 Dark"}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-lg text-white ${darkMode ? "bg-green-700" : "bg-green-500"
                    }`}
                >
                    <h2 className="text-xl">Income</h2>
                    <p className="text-2xl font-bold">
                        ₹{data.totalIncome}
                    </p>
                </div>

                <div className="bg-red-500 text-white p-5 rounded-lg">
                    <h2 className="text-xl">Expense</h2>
                    <p className="text-2xl font-bold">
                        ₹{data.totalExpense}
                    </p>
                </div>

                <div className="bg-blue-500 text-white p-5 rounded-lg">
                    <h2 className="text-xl">Balance</h2>
                    <p className="text-2xl font-bold">
                        ₹{data.balance}
                    </p>
                </div>

                <div className="bg-purple-500 text-white p-5 rounded-lg">
                    <h2 className="text-xl">Transactions</h2>
                    <p className="text-2xl font-bold">
                        {data.transactionCount}
                    </p>
                </div>
            </div>

            <ExpenseForm
                darkMode={darkMode}
                editingTransaction={editingTransaction}
                setEditingTransaction={setEditingTransaction}
                onTransactionAdded={refreshDashboard}
            />

            <TransactionList
                darkMode={darkMode}
                refresh={refresh}
                onTransactionDeleted={refreshDashboard}
                setEditingTransaction={setEditingTransaction}
            />

            <ExpenseChart
                darkMode={darkMode}
                income={data.totalIncome}
                expense={data.totalExpense}
            />

            <MonthlyExpenseChart darkMode={darkMode} />
        </div>
    );
}

export default Dashboard;