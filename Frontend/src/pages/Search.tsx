import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Search() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  //setLoading(true);

const handleSearch = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!query.trim()) {
    setError(
      "Please enter something to search."
    );
    return;
  }

  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await api.post(
      "/search",
      { query }
    );

    const data = response.data;

    if (
      !data.results ||
      !Array.isArray(data.results) ||
      data.results.length === 0
    ) {
      setError(
        `No deals found for "${query}".`
      );
      return;
    }

    setResult(data);

  } catch (error) {
    console.error(error);

    setError(
      "Unable to fetch deals right now."
    );
  } finally {
    setLoading(false);
  }
};

  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      await api.post(
        "/comparisons/save",
        {
          query: result.query,
          best_source:
            result.cheapest.source,
          best_price:
            result.cheapest.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Comparison saved successfully"
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to save comparison"
      );
    }
  };

  return (
  <div
    className="min-h-screen w-full overflow-x-hidden"
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
    {/* Hero */}
    <div className="flex flex-col items-center pt-12 pb-14 px-6">

      <div className="relative w-40 h-40 mb-8">

  <div
    className="
      absolute inset-0
      rounded-full
      bg-gradient-to-br
      from-yellow-100
      via-yellow-200
      to-yellow-400
      blur-sm
    "
  />

  <div
    className="
      absolute inset-2
      rounded-full
      bg-white/20
      backdrop-blur-xl
      border border-white/40
    "
  />

  <div
    className="
      absolute top-6 left-8
      w-10 h-10
      rounded-full
      bg-white/70
      blur-md
    "
  />

</div>

      <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
        BillGPT 💳
      </h1>

      <p className="text-base md:text-lg text-slate-700 mt-3 mb-8">
        What do you want to save on today?
      </p>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-5xl"
      >
        <div className="bg-white rounded-full shadow-xl p-2 flex items-center gap-2">

          <input
            type="text"
            placeholder="Search groceries, flights, bills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-3 text-base bg-transparent outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-10 py-4 rounded-full font-semibold"
            >
            {loading ? "Searching..." : "Search"}
         </button>

        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-3 mt-8">

        <button className="bg-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          🛒 Buy Groceries
        </button>

        <button className="bg-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          💡 Cut My Bills
        </button>

        <button className="bg-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          ✈️ Flight Deals
        </button>

        <button className="bg-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition">
          📍 Offers Near Me
        </button>

      </div>

    </div>

    {/* Error State */}
{error && (
  <div className="max-w-3xl mx-auto px-6 pb-12">

    <div
      className="
        bg-white/90
        backdrop-blur-sm
        rounded-2xl
        p-8
        shadow-xl
        text-center
      "
    >

      <div className="text-5xl mb-4">
        😕
      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        No Deals Found
      </h2>

      <p className="text-slate-600 mt-3">
        {error}
      </p>

      <p className="text-slate-500 mt-4">
        Try searching for:
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-4">

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          groceries
        </span>

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          milk
        </span>

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          iphone
        </span>

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          laptop
        </span>

        <span className="bg-yellow-100 px-4 py-2 rounded-full">
          flights
        </span>

      </div>

    </div>

  </div>
)}

    {result?.results?.length > 0 && (
      <div className="max-w-6xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Available Deals
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mb-6">

          {result.results?.map(
            (item: any, index: number) => (
              <div
  key={index}
  className={`
    rounded-3xl
    p-5
    backdrop-blur-md
    border
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-2xl
    ${
      item.source === result.cheapest?.source
        ? "bg-yellow-50/90 border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.45)]"
        : "bg-white/75 border-white/60"
    }
  `}
>
  <h3 className="text-lg font-semibold text-slate-800">
    {item.source}
  </h3>

  {item.source === result.cheapest?.source && (
    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-yellow-400 text-black rounded-full">
      ⭐ Best Deal
    </span>
  )}

  <p className="text-3xl font-bold text-green-600 mt-4">
    ₹{item.price}
  </p>

  <p className="text-sm text-slate-500 mt-1">
    Final payable amount
  </p>
</div>
            )
          )}

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div
            className="
              bg-white/95
              rounded-2xl
              p-5
              shadow-md
              border-l-4 border-green-500
            "
          >
            <h3 className="text-lg font-semibold mb-3">
              ⭐ Cheapest Deal
            </h3>

            <p className="text-slate-500 text-sm">
              Platform
            </p>

            <p className="font-medium">
              {result.cheapest?.source}
            </p>

            <p className="text-2xl font-bold text-green-600 mt-3">
              ₹{result.cheapest?.price}
            </p>
          </div>

          <div
            className="
              bg-white/95
              rounded-2xl
              p-5
              shadow-md
              border-l-4 border-blue-500
            "
          >
            <h3 className="text-lg font-semibold mb-3">
              💳 Best Payment Method
            </h3>

            <p className="text-slate-500 text-sm">
              Card
            </p>

            <p className="font-medium">
              {result.best_way_to_pay?.card}
            </p>

            <p className="text-slate-500 text-sm mt-2">
              Reward
            </p>

            <p className="font-medium">
              {result.best_way_to_pay?.reward_percent}%
            </p>

            <p className="text-2xl font-bold text-blue-600 mt-3">
              ₹{result.best_way_to_pay?.effective_price}
            </p>
          </div>

        </div>

        <div className="flex justify-center mt-8">

          <button
            onClick={handleSave}
            disabled={!result}
            className={`
                px-8
                py-3
                rounded-full
                font-medium
                transition
                ${
                    result
                    ? "bg-black text-white hover:opacity-90"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }
            `}
          >
            Save Comparison
          </button>

        </div>

      </div>
    )}

  </div>
);
}

export default Search;