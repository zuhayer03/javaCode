import { useState } from "react";

const initialState = {
  topic: "",
  mode: "aiOpponent",
};

export default function DebateForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.topic.trim() || formData.topic.trim().length < 10) {
      setError("Please enter at least 10 characters describing the legal topic or case facts.");
      return;
    }

    setError("");
    await onSubmit({ topic: formData.topic.trim(), mode: formData.mode });
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Legal Adversarial Reasoning Demo</h1>
      <p className="muted">Enter a legal topic or case facts and let AI draft opening arguments.</p>

      <label htmlFor="topic">Debate topic / case facts</label>
      <textarea
        id="topic"
        name="topic"
        rows={6}
        placeholder="Example: Should digital evidence collected without user consent be admissible in criminal court?"
        value={formData.topic}
        onChange={handleChange}
      />

      <label htmlFor="mode">Mode</label>
      <select id="mode" name="mode" value={formData.mode} onChange={handleChange}>
        <option value="aiOpponent">AI Opponent</option>
        <option value="aiJudge">AI Judge</option>
      </select>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Arguments"}
      </button>

      {/* TODO: add future voice integration to capture spoken case facts. */}
    </form>
  );
}
