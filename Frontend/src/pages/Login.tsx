import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  setLoading(true);

  try {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    navigate("/search");

  } catch (error: any) {
    alert(
      error.response?.data?.detail ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
  <>
    {loading && <div className="top-loader"></div>}

    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        backgroundColor: "#facc15",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px),
          linear-gradient(to bottom, #facc15, #fef9c3)
        `,
        backgroundSize: `
          86px 86px,
          86px 86px,
          100% 100%
        `,
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="text-center text-slate-600 mt-2 mb-8">
          Login to continue saving money
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full px-5 py-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-4
              rounded-xl
              font-semibold
              hover:opacity-90
              transition
              disabled:opacity-70
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Login;