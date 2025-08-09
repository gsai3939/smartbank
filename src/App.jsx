import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Alerts from "./pages/Alerts.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => nav("/")} className="text-xl font-semibold">
            SmartBank • Real-Time Monitor
          </button>
          <nav className="flex gap-4 text-sm">
            {[
              ["Dashboard", "/"],
              ["Transactions", "/transactions"],
              ["Alerts", "/alerts"],
              ["Login", "/login"],
            ].map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded ${
                    isActive ? "bg-indigo-600" : "hover:bg-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}
