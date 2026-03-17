import { useState } from "react";
import { useRouter } from "next/router";
import DebateForm from "../../components/DebateForm";
import { createDebate } from "../../utils/api";

export default function CreateDebatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async ({ topic, mode }) => {
    try {
      setLoading(true);
      setError("");
      const result = await createDebate({ topic, mode });
      router.push(`/debate/results?id=${result.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <DebateForm onSubmit={handleSubmit} loading={loading} />
      {error && <p className="error global-error">{error}</p>}
    </main>
  );
}
