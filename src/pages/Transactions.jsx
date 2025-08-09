import { useMemo, useState } from "react";
import { useTxnStore } from "../store/useTxnStore";
import { format } from "date-fns";

export default function Transactions() {
  const { txns, filter, setFilter } = useTxnStore();
  const [page, setPage] = useState(0);
  const pageSize = 15;

  const rows = useMemo(() => {
    let r = txns;
    if (filter.flaggedOnly) r = r.filter(t => t.flagged);
    if (filter.search) {
      const s = filter.search.toLowerCase();
      r = r.filter(t =>
        t.merchant.toLowerCase().includes(s) ||
        t.location.toLowerCase().includes(s) ||
        t.cardLast4.includes(s)
      );
    }
    return r;
  }, [txns, filter]);

  const pageCount = Math.ceil(rows.length / pageSize);
  const pageRows = rows.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Transactions</h1>

      <div className="flex flex-wrap items-center gap-3">
        <input
          placeholder="Search merchant/location/last4"
          className="px-3 py-2 rounded bg-gray-900 border border-gray-800 w-72"
          value={filter.search}
          onChange={e => setFilter({ search: e.target.value })}
        />
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={filter.flaggedOnly}
            onChange={e => setFilter({ flaggedOnly: e.target.checked })}
          />
          Flagged only
        </label>
      </div>

      <div className="overflow-auto rounded-2xl border border-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-900">
            <tr>
              {["Time", "Merchant", "Amount", "Risk", "Card", "Loc", "Flag"].map(h => (
                <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map(t => (
              <tr key={t.id} className="odd:bg-gray-950 even:bg-gray-900/50">
                <td className="px-4 py-2">{format(t.ts, "HH:mm:ss")}</td>
                <td className="px-4 py-2">{t.merchant}</td>
                <td className="px-4 py-2">${t.amount}</td>
                <td className="px-4 py-2">{t.risk}</td>
                <td className="px-4 py-2">**** {t.cardLast4}</td>
                <td className="px-4 py-2">{t.location}</td>
                <td className={`px-4 py-2 ${t.flagged ? "text-red-400" : "text-green-400"}`}>
                  {t.flagged ? "FLAG" : "OK"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-800 disabled:opacity-50"
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
        >
          Prev
        </button>
        <span className="text-xs">
          Page {page + 1} / {Math.max(1, pageCount)}
        </span>
        <button
          className="px-3 py-1 rounded bg-gray-800 disabled:opacity-50"
          onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
