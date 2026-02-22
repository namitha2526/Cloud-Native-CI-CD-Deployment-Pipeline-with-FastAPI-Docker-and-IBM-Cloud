import React, { useState } from "react";
import axios from "axios";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const API = "http://localhost:8000"; // change after deployment

export default function App() {
  const [userId, setUserId] = useState("");
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const analyze = async () => {
    try {
      const response = await axios.post(
        `${API}/analyze/${userId}`,
        {
          repo_data: {
            num_languages: Number(formData.num_languages),
            avg_function_length: Number(formData.avg_function_length),
            num_repos: Number(formData.num_repos),
            commit_frequency: Number(formData.commit_frequency)
          },
          cognitive_test: {
            abstraction: Number(formData.abstraction),
            debugging: Number(formData.debugging),
            system_design: Number(formData.system_design),
            optimization: Number(formData.optimization)
          }
        }
      );
      setResult(response.data);
    } catch (err) {
      alert("Analysis failed");
    }
  };

  const radarData = result
    ? {
        labels: ["Analytical", "Architectural", "Technical"],
        datasets: [
          {
            label: "Intelligence Profile",
            data: [
              result.cognitive_profile.analytical_strength,
              result.cognitive_profile.architectural_thinking,
              result.technical_score / 10
            ],
            backgroundColor: "rgba(34,197,94,0.2)",
            borderColor: "rgba(34,197,94,1)",
            borderWidth: 2
          }
        ]
      }
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700 mb-2">
          Cognitive + Technical Intelligence Engine
        </h1>
        <p className="text-gray-600 mb-8">
          AI-based Developer Profiling & Career Optimization
        </p>

        {/* User ID */}
        <div className="mb-6">
          <input
            placeholder="Enter User ID"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg text-green-700 mb-4">
              Technical Inputs
            </h2>
            {["num_languages", "avg_function_length", "num_repos", "commit_frequency"].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/_/g, " ")}
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold text-lg text-green-700 mb-4">
              Cognitive Inputs (1–10)
            </h2>
            {["abstraction", "debugging", "system_design", "optimization"].map(field => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/_/g, " ")}
                className="w-full p-2 border rounded mb-3"
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-6">
          <button
            onClick={analyze}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Run Intelligence Analysis
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-10 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Analysis Results
            </h2>

            <p className="mb-2">
              <strong>Technical Score:</strong> {result.technical_score}
            </p>

            <p className="mb-6">
              <strong>Recommended Career Path:</strong> {result.recommended_career_path}
            </p>

            <Radar data={radarData} />
          </div>
        )}
      </div>
    </div>
  );
}
