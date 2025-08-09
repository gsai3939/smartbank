import { useEffect, useMemo, useState } from "react";
import { onTransaction, startStream, stopStream } from "../services/stream";
import { useTxnStore } from "../store/useTxnStore";
import { format } from "date-fns";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid
} from "recharts";

export default function Dashboard() {
  const { txns, pushTxn } = useTxnStore();
  const [streaming, setStreaming] = useState(true);

  useEffect(() => {
    startStream();
    const off = onTransaction(pushTxn);
    return () => { off(); };
  }, [pushTxn]);

  const kpis = useMemo(() => {
    const lastMin = Date.now() - 60_000;
    const recent = txns.filter(t => t.ts >= lastMin);
    const count = recent.length;
    const flagged = recent.filter(t => t.flagged).length;
    const vol = recent.reduce((s, t) => s + t.amount, 0);
    return { count, flagged, vol: vol.toFixed(2) };
  }, [txns]);

  const chartData = useMemo(() => {
    // simple rolling window of risk score (avg of last N)
    const N = Math.min(20, txns.length);
    const slice = [...txns].slice(0, N).reverse();
    return slice.map(t => ({
      t: format(t.ts, "HH:mm:ss"),
      risk: t.risk,
      amount: t.amount
    }));
  }, [txns]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Real-Time Dashboard</h1>

      {/* KPIs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-800 p-4">
          <div className="text-sm text-gray-400">Txns / 60s</div>
          <div className="text-3xl font-bold">{kpis.count}</div>
        </div>
        <div className="rounded-2xl border border-gray-800 p-4">
          <div className="text-sm text-gray-400">Flagged / 60s</div>
          <div className="text-3xl font-bold text-red-400">{kpis.flagged}</div>
        </div>
        <div className="rounded-2xl border border-gray-800 p-4">
          <div className="text-sm text-gray-400">Volume / 60s</div>
          <div className="text-3xl font-bold">${kpis.vol}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-800 p-4">
          <div className="mb-2 text-sm text-gray-400">Risk trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopOpacity={0.6}/>
                    <stop offset="95%" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis domain={[0,1]} />
                <Tooltip />
                <Area type="monotone" dataKey="risk" fillOpacity={1} fill="url(#g1)" strokeOpacity={1}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-800 p-4">
          <div className="mb-2 text-sm text-gray-400">Amount trend</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Live feed */}
      <div className="rounded-2xl border border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="font-semibold">Live Transactions</h2>
          <button
            onClick={() => (streaming ? (stopStream(), setStreaming(false)) : (startStream(), setStreaming(true)))}
            className="text-xs px-3 py-1 rounded bg-gray-800 hover:bg-gray-700"
          >
            {streaming ? "Pause" : "Resume"}
          </button>
        </div>
        <ul className="max-h-72 overflow-auto divide-y divide-gray-900">
          {txns.slice(0, 25).map(t => (
            <li key={t.id} className="px-4 py-2 flex items-center justify-between">
              <div className="text-sm">
                <span className="font-mono mr-2">{t.merchant}</span>
                • ${t.amount} • **** {t.cardLast4} • {t.location}
              </div>
              <div className={`text-xs ${t.flagged ? "text-red-400" : "text-green-400"}`}>
                {t.flagged ? `RISK ${t.risk}` : "OK"}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
