SmartBank – Real-Time Fraud Monitoring (Frontend Only)
A modern React dashboard that simulates real-time card transactions, highlights suspicious activity, and visualizes trends. It’s frontend-only (no backend required) and is designed to later plug into a Kafka + ML + Spring Boot stack.

✨ Features
Live stream simulation: New transactions every second (risk score + flags)

KPIs: Txns/min, flagged/min, volume/min

Charts: Risk trend & amount trend (auto-updating)

Transactions table: Search, flagged-only filter, pagination

Alerts: Recent high-risk events

Routing: Dashboard, Transactions, Alerts, Login (stub)

Styling: Tailwind CSS, dark UI

🧠 How it works (demo mode)
src/services/stream.js simulates a Kafka consumer by emitting a new transaction every 1s.

State is stored in a lightweight global store (Zustand), so KPIs, charts, table, and alerts update instantly.

Replace this with WebSocket/SSE later to connect a real backend.

🛠 Tech Stack
React 18 + React Router

Tailwind CSS

Recharts (charts)

Zustand (state)

Vite (dev/build)

