import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MonthlyExpenseChart({ darkMode }) {
  const data = [
    { month: "Jan", expense: 1200 },
    { month: "Feb", expense: 800 },
    { month: "Mar", expense: 1500 },
    { month: "Apr", expense: 1000 },
    { month: "May", expense: 2200 },
  ];

  return (
    <div
      className={`p-5 rounded-lg shadow mt-6 ${
        darkMode
          ? "bg-gray-800 text-white"
          : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        Monthly Expenses
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="expense" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyExpenseChart;