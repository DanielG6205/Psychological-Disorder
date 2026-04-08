import Link from "next/link";

export default function GamePage() {
  return (
    <main className="doc-shell">
      <header className="doc-header">
        <p className="kicker">Part 2</p>
        <h1>Creative Piece: Board Game / Interactive Activity</h1>
        <p className="lead">
          Create a creative representation that demonstrates your understanding of
          the psychological disorder. The goal is to combine creativity with
          psychological accuracy, reduce stigma, and deepen understanding of
          mental health.
        </p>
      </header>

      <section className="doc-section">
        <h2>Presentation Expectations (3-5 Minutes)</h2>
        <p>During your presentation, explain:</p>
        <ul>
          <li>What the disorder is.</li>
          <li>Key symptoms.</li>
          <li>Causes or contributing factors.</li>
          <li>Treatment options.</li>
          <li>How your creative project represents the disorder accurately.</li>
        </ul>
        <p>
          You may use note cards, but do not read directly from your research
          paper.
        </p>
      </section>

      <section className="doc-section">
        <h2>Board Game / Interactive Activity Requirements</h2>
        <p>
          Design a simple board game or activity that teaches players about the
          disorder.
        </p>
        <p>Your game should represent:</p>
        <ul>
          <li>Symptoms</li>
          <li>Challenges people may face</li>
          <li>Treatment or coping strategies</li>
        </ul>
        <p>
          During the presentation, explain how your game mechanics connect to
          psychological concepts.
        </p>
      </section>

      <section className="doc-section">
        <h2>Placeholder Build Area</h2>
        <p className="placeholder-line">
          Placeholder game title: <strong>[Insert Game Name]</strong>
        </p>
        <p className="placeholder-line">
          Placeholder game concept: [Insert how gameplay models your disorder]
        </p>
        <p className="placeholder-line">
          Placeholder mechanics: [Insert turns, challenges, and coping/treatment
          systems]
        </p>
        <p className="placeholder-line">
          Placeholder script points: [Insert what each speaker will explain in the
          3-5 minute presentation]
        </p>
      </section>

      <footer className="doc-footer">
        <Link href="/">Back to Home</Link>
        <Link href="/handout">Go to Handout</Link>
      </footer>
    </main>
  );
}
