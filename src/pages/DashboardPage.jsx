import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2"];

export default function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeTab, setActiveTab] = useState("Portfolio");
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState({ type: "Buy", coin: "", amount: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchPrices = () => {
      axios
        .get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
            sparkline: false,
          },
        })
        .then((res) => setCoins(res.data))
        .catch((err) => console.error("Error fetching prices:", err));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleTransaction = (e) => {
    e.preventDefault();
    if (!form.coin || !form.amount) return;

    const newTransaction = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date().toISOString(),
    };

    if (editingIndex !== null) {
      const updated = [...transactions];
      updated[editingIndex] = newTransaction;
      setTransactions(updated);
      setEditingIndex(null);
    } else {
      setTransactions([...transactions, newTransaction]);
    }

    setForm({ type: "Buy", coin: "", amount: "" });
  };

  const deleteTransaction = (indexToDelete) => {
    const updated = transactions.filter((_, index) => index !== indexToDelete);
    setTransactions(updated);
  };

  const editTransaction = (index) => {
    const tx = transactions[index];
    setForm({ type: tx.type, coin: tx.coin, amount: tx.amount });
    setEditingIndex(index);
  };

  const portfolioSummary = () => {
    const summary = {};
    transactions.forEach(({ type, coin, amount }) => {
      if (!summary[coin]) summary[coin] = 0;
      summary[coin] += type === "Buy" ? amount : -amount;
    });
    return summary;
  };

  const calculateTotalValue = (summary) => {
    return coins.reduce((acc, coin) => {
      const held = summary[coin.id] || 0;
      return acc + held * coin.current_price;
    }, 0);
  };

  const renderPortfolioChart = (summary) => {
    const data = coins
      .map((coin) => {
        const heldAmount = summary[coin.id] || 0;
        return heldAmount > 0
          ? {
              name: coin.name,
              value: heldAmount * coin.current_price,
            }
          : null;
      })
      .filter(Boolean);

    if (data.length === 0) return null;

    return (
      <div className="w-full h-80 bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Portfolio Allocation</h2>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

 const renderLivePrices = () => (
  <div className="w-full md:w-72 bg-white p-6 rounded-2xl shadow sticky top-24 h-fit">
    <h2 className="text-lg font-bold text-center mb-4">Live Prices</h2>
    <ul className="space-y-4">
      {coins.slice(0, visibleCount).map((coin) => (
        <li key={coin.id} className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-3 w-40 truncate">
            <img src={coin.image} alt={coin.name} className="w-6 h-6" />
            <span className="font-medium text-gray-700 truncate">{coin.name}</span>
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-800">
              ${coin.current_price.toFixed(2)}
            </div>
            <div
              className={`text-xs ${
                coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
          </div>
        </li>
      ))}
    </ul>

    {coins.length > 5 && (
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() =>
            setVisibleCount((prev) =>
              prev + 5 >= coins.length ? coins.length : prev + 5
            )
          }
          disabled={visibleCount >= coins.length}
          className={`text-blue-600 hover:underline text-sm font-medium ${
            visibleCount >= coins.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Show More
        </button>
        <button
          onClick={() =>
            setVisibleCount((prev) => (prev - 5 <= 5 ? 5 : prev - 5))
          }
          disabled={visibleCount <= 5}
          className={`text-red-500 hover:underline text-sm font-medium ${
            visibleCount <= 5 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Show Less
        </button>
      </div>
    )}
  </div>
);

  const renderTab = () => {
    const summary = portfolioSummary();
    const totalValue = calculateTotalValue(summary);

    if (activeTab === "Portfolio") {
      return (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-md flex items-center justify-between">
              <div>
                <h2 className="text-gray-700 text-lg font-medium">Total Portfolio Value</h2>
                <p className="text-4xl font-bold text-blue-600 mt-1">
                  ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {coins.map((coin) => {
                const heldAmount = summary[coin.id] || 0;
                if (heldAmount <= 0) return null;
                const value = heldAmount * coin.current_price;

                return (
                  <div
                    key={coin.id}
                    className="p-4 bg-white border rounded-2xl shadow hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-gray-900 font-semibold">{coin.name}</div>
                      <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-gray-500 mb-1">
                      {coin.symbol.toUpperCase()} — {heldAmount} coins
                    </div>
                    <div className="text-xl font-bold text-green-600">
                      ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                );
              })}
            </div>

            {renderPortfolioChart(summary)}
          </div>

          {renderLivePrices()}
        </div>
      );
    }

    if (activeTab === "Transactions") {
      return (
        <div className="space-y-8">
          <form
            onSubmit={handleTransaction}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 border rounded-2xl shadow"
          >
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Buy</option>
              <option>Sell</option>
            </select>
            <select
              value={form.coin}
              onChange={(e) => setForm({ ...form, coin: e.target.value })}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Coin</option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="Amount"
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold p-2 rounded-md hover:bg-blue-700 transition"
            >
              {editingIndex !== null ? "Update" : "Add"} Transaction
            </button>
          </form>

          <div className="bg-white p-6 border rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions yet.</p>
            ) : (
              <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
                {transactions.map((tx, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center border-b pb-2 text-sm"
                  >
                    <div>
                      <span
                        className={`font-semibold ${
                          tx.type === "Buy" ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {tx.type}
                      </span>{" "}
                      — {tx.amount} <span className="uppercase">{tx.coin}</span>{" "}
                      <span className="text-gray-500">
                        on {new Date(tx.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editTransaction(i)}
                        className="text-yellow-600 hover:underline text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTransaction(i)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">💼 Your Crypto Dashboard</h1>

      <div className="mb-8 flex gap-4">
        {["Portfolio", "Transactions"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setForm({ type: "Buy", coin: "", amount: "" });
              setEditingIndex(null);
            }}
            className={`px-5 py-2.5 rounded-full text-sm font-medium shadow transition-all ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderTab()}
    </div>
  );
}
