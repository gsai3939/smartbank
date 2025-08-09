import { create } from "zustand";

export const useTxnStore = create((set, get) => ({
  txns: [],
  pushTxn: (t) => set({ txns: [t, ...get().txns].slice(0, 200) }), // keep last 200
  clear: () => set({ txns: [] }),
  filter: { search: "", flaggedOnly: false },
  setFilter: (patch) => set((s) => ({ filter: { ...s.filter, ...patch } })),
}));
