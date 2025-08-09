export default function Login() {
  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form className="space-y-3">
        <input placeholder="Email" className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800" />
        <input placeholder="Password" type="password" className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-800" />
        <button type="button" className="w-full px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500">
          Sign In (stub)
        </button>
        <p className="text-xs text-gray-400">
          JWT/OAuth integration goes here. On success, store token and route to <code>/</code>.
        </p>
      </form>
    </div>
  );
}
