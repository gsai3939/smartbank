// Simple event emitter that pushes a new transaction every second.
// In real life you'd use WebSocket/SSE hooked to Kafka consumers.
const listeners = new Set();

function randomTxn() {
  const id = crypto.randomUUID();
  const amount = +(Math.random() * 2000).toFixed(2);
  const risk = +(Math.random() * 1).toFixed(2);
  const merchant = ["AMZN", "UBER", "WALMART", "AIRBNB", "TARGET"][
    Math.floor(Math.random() * 5)
  ];
  const cardLast4 = String(Math.floor(1000 + Math.random() * 8999));
  const location = ["NY", "CA", "TX", "FL", "NJ"][Math.floor(Math.random() * 5)];
  const flagged = risk > 0.85 || amount > 1500;
  return {
    id, ts: Date.now(), amount, risk, merchant, cardLast4, location, flagged,
  };
}

let timer;
export function startStream() {
  if (timer) return;
  timer = setInterval(() => {
    const evt = randomTxn();
    listeners.forEach((cb) => cb(evt));
  }, 1000);
}

export function stopStream() {
  clearInterval(timer);
  timer = null;
}

export function onTransaction(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
