import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactions } from "../context/TransactionContext";

const Dashboard = () => {
  const { transactions } = useTransactions();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map((month, index) => {
    const monthTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() === index
    );

    const income = monthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = monthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { month, income, expense };
  });

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = income - expense;

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
    { name: "Remaning", value: remaining },
  ];

  const COLORS = ["#4CAF50", "#F44336", "#000000"];

  const todayStr = new Date().toISOString().split("T")[0];
  const todaysTransactions = transactions.filter((t) => t.date === todayStr);

  return (
    <div className=" space-y-8">
      <h2 className="text-3xl font-bold mb-5">Dashboard</h2>
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Income</p>
          <p className="text-3xl font-bold text-green-600">NPR {income}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Expenses</p>
          <p className="text-3xl font-bold text-red-600">NPR {expense}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Balance</p>
          <p className="text-3xl font-bold text-gray-800">
            NPR {income - expense}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Income vs Expense</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-xl font-semibold mb-4">Monthly Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#4CAF50" />
              <Bar dataKey="expense" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Today's Transactions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Today's Activity</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {todaysTransactions.length === 0 ? (
            <p className="text-gray-500">No transactions today.</p>
          ) : (
            todaysTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition rounded-lg p-3"
              >
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{t.description}</p>
                  <p className="text-sm text-gray-500">{t.date}</p>
                </div>
                <div
                  className={`font-semibold text-right ${
                    t.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"} Rs. {Math.abs(t.amount)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
