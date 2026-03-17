export default function DebateResults({ topic, mode, pro, con, judge }) {
  return (
    <div className="results-wrapper">
      <div className="card">
        <h1>Debate Results</h1>
        <p className="muted"><strong>Topic:</strong> {topic}</p>
        <p className="muted"><strong>Mode:</strong> {mode === "aiJudge" ? "AI Judge" : "AI Opponent"}</p>
      </div>

      <div className="grid">
        <section className="card panel pro">
          <h2>Pro Opening Argument</h2>
          <p>{pro}</p>
        </section>

        <section className="card panel con">
          <h2>Con Opening Argument</h2>
          <p>{con}</p>
        </section>
      </div>

      {judge && (
        <section className="card judge">
          <h2>Judge Reasoning Summary</h2>
          <p>{judge}</p>
          {/* TODO: add future reasoning analytics and score visualizations. */}
        </section>
      )}

      {/* TODO: add future multi-agent orchestration for multiple specialist legal agents. */}
    </div>
  );
}
