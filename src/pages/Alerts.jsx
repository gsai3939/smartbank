import { useMemo } from "react";
import { useTxnStore } from "../store/useTxnStore";
import { format } from "date-fns";

export default function Alerts() {
  const { txns } = useTxnStore();
  const alerts = useMemo(() => txns.filter(t => t.flagged).slice(0, 50), [txns]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Alerts</h1>
      <ul className="space-y-2">
        {alerts.map(t => (
          <li key={t.id} className="rounded-xl border border-red-900/40 bg-red-950/40 px-4 py-3">
            <div className="text-sm">
              <b>High-risk transaction</b> at <span className="font-mono">{t.merchant}</span> — ${t.amount} • ****{t.cardLast4} • {t.location}
            </div>
            <div className="text-xs text-gray-400">{format(t.ts, "PPpp")} • risk {t.risk}</div>
          </li>
        ))}
      </ul>
      {alerts.length === 0 && <div className="text-sm text-gray-400">No alerts yet. Keep the stream running.</div>}
    </div>
  );
}
