import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const [comparisons, setComparisons] =
    useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response = await api.get(
        "/comparisons/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComparisons(response.data);
    } catch (error) {
      alert("Failed to load history");
    }
  };

  return (
    <div
  className="min-h-screen px-6 py-10"
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
  <div className="max-w-6xl mx-auto">

      <h1 className="text-4xl font-bold text-slate-900 mb-8">
        Saved Comparisons
      </h1>

      {comparisons.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 shadow-lg text-center">
          <h2 className="text-2xl font-semibold">
            No Comparisons Yet
          </h2>

          <p className="text-slate-500 mt-2">
            Search and save deals to see
            them here.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {comparisons.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 shadow-lg hover:-translate-y-1 transition"
            >
              <div className="text-sm text-slate-500 mb-2">
                Search Query
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                {item.query}
              </h2>

              <div className="mt-5">
                <p className="text-slate-500 text-sm">
                  Best Platform
                </p>

                <p className="font-semibold text-lg">
                  {item.best_source}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-slate-500 text-sm">
                  Best Price
                </p>

                <p className="text-3xl font-bold text-green-600">
                  ₹{item.best_price}
                </p>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
    </div>
  );
}

export default History;