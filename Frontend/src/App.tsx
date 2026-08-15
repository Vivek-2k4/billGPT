import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import History from "./pages/History";

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-yellow-400 text-black px-6 py-4 shadow-md">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          BillGPT 💳
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-orange-400 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:text-orange-400 font-semibold"
          >
            Signup
          </Link>

          <Link
            to="/search"
            className="hover:text-orange-400 font-semibold"
          >
            Search
          </Link>

          <Link
            to="/history"
            className="hover:text-orange-400 font-semibold"
          >
            History
          </Link>

          <button
            onClick={handleLogout}
            className="bg-yellow-100 px-4 py-2 rounded-xl hover:bg-orange-400 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/history"
          element={<History />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;