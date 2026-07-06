import { useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const response = await axios.post(`${API}/predict`, {
        text,
      });
      console.log(response.data.label)
      setPrediction(response.data.label);
    } catch (err) {
      console.error(err);
      setError("Failed to get prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Fake News Detection</h1>

      <textarea
        rows={12}
        placeholder="Paste the news article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          resize: "vertical",
        }}
      />

      <button
        onClick={handlePredict}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {prediction && (
        <div
          style={{
            marginTop: "30px",
            fontSize: "22px",
            fontWeight: "bold",
          }}
        >
          Prediction: {prediction}
        </div>
      )}

      {error && (
        <div
          style={{
            color: "red",
            marginTop: "20px",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default App;