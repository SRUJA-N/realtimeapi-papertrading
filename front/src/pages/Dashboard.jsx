import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [cryptoData, setCryptoData] = useState(null);
  const [lastPrice, setLastPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [portfolio, setPortfolio] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [error, setError] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState("bitcoin");

  const token = localStorage.getItem("token");
  const availableTickers = ["bitcoin", "ethereum", "dogecoin", "litecoin", "binancecoin"];

  // Fetch user, portfolio, and trade history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, portfolioRes, historyRes] = await Promise.all([
          axios.get("http://localhost:8000/users/me", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8000/portfolio", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("http://localhost:8000/trade-history", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setUser(userRes.data);
        setPortfolio(portfolioRes.data);
        setTradeHistory(historyRes.data);
      } catch (err) {
        setError("Failed to load initial data. Please log in again.");
        console.error(err);
      }
    };
    fetchData();
  }, [token]);

  // WebSocket for real-time crypto updates
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/ws/${selectedTicker}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setLastPrice((prev) => (prev !== null ? prev : data.price));
      setCryptoData(data);

      setPriceHistory((prev) => {
        const newHistory = [...prev, data.price];
        if (newHistory.length > 20) newHistory.shift();
        return newHistory;
      });
    };

    ws.onclose = () => setCryptoData(null);
    return () => ws.close();
  }, [selectedTicker]);

  // Trade handler
  const handleTrade = async (type) => {
    if (!cryptoData) return;
    try {
      await axios.post(
        "http://localhost:8000/trade",
        { symbol: cryptoData.stock, trade_type: type, quantity: parseInt(quantity), price: parseFloat(cryptoData.price) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const [portfolioRes, historyRes] = await Promise.all([
        axios.get("http://localhost:8000/portfolio", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/trade-history", { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      setPortfolio(portfolioRes.data);
      setTradeHistory(historyRes.data);
    } catch (err) {
      alert(err.response?.data?.detail || "Trade failed!");
      console.error(err);
    }
  };

  // Chart configuration
  const lineChartData = {
    labels: priceHistory.map((_, i) => i + 1),
    datasets: [
      {
        label: "Price",
        data: priceHistory,
        borderColor: "#26a69a",
        backgroundColor: "rgba(38, 166, 154, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { mode: "index" } },
    scales: {
      x: { ticks: { color: "#d1d4dc" }, grid: { color: "#2a2e39" } },
      y: { ticks: { color: "#d1d4dc" }, grid: { color: "#2a2e39" } },
    },
    layout: { padding: { left: 10, right: 10, top: 10, bottom: 10 } },
  };

  if (error) return <div className="dashboard-container">{error}</div>;
  if (!user) return <div className="dashboard-container">Loading...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Paper Trading Platform</h1>
        <div className="user-info">{user.email}</div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-top">
          <div className="stock-panel">
            <h3>Live Market</h3>
            <select value={selectedTicker} onChange={(e) => setSelectedTicker(e.target.value)}>
              {availableTickers.map((ticker) => (
                <option key={ticker} value={ticker}>{ticker.toUpperCase()}</option>
              ))}
            </select>

            {cryptoData ? (
              <>
                <h2>{cryptoData.stock.toUpperCase()}</h2>
                <p className={`price ${cryptoData.price > lastPrice ? "up" : "down"}`}>
                  ${cryptoData.price.toFixed(2)}
                </p>
                <p className={`change ${cryptoData.change_percent >= 0 ? "up" : "down"}`}>
                  {cryptoData.change_percent >= 0 ? "▲" : "▼"} {cryptoData.change_percent}%
                </p>
                <p className="volume">Volume: {cryptoData.volume}</p>
                <div className="line-chart-container">
                  <Line data={lineChartData} options={lineChartOptions} />
                </div>
              </>
            ) : (
              <p>❌ Disconnected or loading...</p>
            )}
          </div>

          <div className="trade-panel">
            <h3>Place Order</h3>
            <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <div className="trade-buttons">
              <button className="buy-btn" onClick={() => handleTrade("BUY")}>Buy</button>
              <button className="sell-btn" onClick={() => handleTrade("SELL")}>Sell</button>
            </div>
          </div>
        </div>

        <div className="table-container">
          <h3>Your Portfolio</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Quantity</th>
                <th>Avg Price</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((p) => (
                <tr key={p.id}>
                  <td>{p.symbol.toUpperCase()}</td>
                  <td>{p.quantity}</td>
                  <td>${p.avg_price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-container">
          <h3>Trade History</h3>
          <table className="portfolio-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {tradeHistory.map((t) => (
                <tr key={t.id}>
                  <td>{t.symbol.toUpperCase()}</td>
                  <td style={{ color: t.trade_type === "BUY" ? "#26a69a" : "#ef5350", fontWeight: "bold" }}>
                    {t.trade_type}
                  </td>
                  <td>{t.quantity}</td>
                  <td>${t.price.toFixed(2)}</td>
                  <td>{new Date(t.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

