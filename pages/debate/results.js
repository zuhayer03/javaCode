import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DebateResults from "../../components/DebateResults";
import { getDebateById } from "../../utils/api";

export default function DebateResultsPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debate, setDebate] = useState(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getDebateById(id);
        setDebate(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return (
    <main className="container">
      <Link href="/debate/create" className="back-link">← Create another debate</Link>

      {loading && <div className="card">Loading results...</div>}
      {error && <div className="card error global-error">{error}</div>}

      {debate && (
        <DebateResults
          topic={debate.topic}
          mode={debate.mode}
          pro={debate.pro}
          con={debate.con}
          judge={debate.judge}
        />
      )}
    </main>
  );
}
