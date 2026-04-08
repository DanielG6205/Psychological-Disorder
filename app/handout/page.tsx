import Link from "next/link";

export default function HandoutPage() {
  return (
    <main className="doc-shell">
      <header className="doc-header">
        <p className="kicker">Part 1</p>
        <h1>Psychological Disorder Research & Student Handout</h1>
        <p className="lead">
          After learning about psychological disorders in AP Psychology, your
          group will research one disorder from the AP Psychology Course and Exam
          Description (CED). Your goal is to educate classmates with a clear,
          informative handout they can use as an AP exam study guide.
        </p>
        <p className="placeholder-line">
          Placeholder topic: <strong>[Insert Assigned Disorder]</strong>
        </p>
      </header>

      <section className="doc-section">
        <h2>Writing Requirements</h2>
        <ul>
          <li>No copied text from sources.</li>
          <li>All writing must be in your own words.</li>
          <li>Use psychological terminology accurately.</li>
        </ul>
      </section>

      <section className="doc-section">
        <h2>Required Handout Components</h2>

        <h3>Component 1: Disorder and Diagnosis</h3>
        <p>
          Explain what the disorder is and how psychologists diagnose it. Describe
          the signs and symptoms used for diagnosis according to psychological
          criteria.
        </p>
        <p className="placeholder-line">
          Placeholder details: [Add your disorder definition + diagnostic symptom
          criteria]
        </p>

        <h3>Component 2: Causes (Biopsychosocial Perspective)</h3>
        <p>
          Explain possible causes or contributing factors. Include biological,
          psychological, and environmental influences, and explain which factors
          research supports for your disorder.
        </p>
        <ul>
          <li>
            Biological factors: genetics, brain chemistry, neurological
            differences.
          </li>
          <li>
            Psychological factors: personality traits, coping patterns, learned
            behaviors.
          </li>
          <li>
            Environmental factors: trauma, stress, upbringing, life experiences.
          </li>
        </ul>
        <p className="placeholder-line">
          Placeholder details: [Add your biopsychosocial evidence here]
        </p>

        <h3>Component 3: Treatment and How It Works</h3>
        <p>
          Explain treatment options and how they help manage symptoms. Do not only
          list treatments.
        </p>
        <ul>
          <li>
            Psychological therapies (for example CBT, behavioral approaches).
          </li>
          <li>Medications and how they affect brain systems or symptoms.</li>
        </ul>
        <p className="placeholder-line">
          Placeholder details: [Add therapy + medication mechanisms here]
        </p>

        <h3>Component 4: Day-in-the-Life Impact</h3>
        <p>
          Describe what daily life might look like for someone living with this
          disorder. Explain impact on daily functioning without stereotypes or
          exaggerated portrayals.
        </p>
        <p className="placeholder-line">
          Placeholder details: [Add realistic daily functioning examples]
        </p>

        <h3>Component 5: Family Impact</h3>
        <p>
          Explain what it may be like for family members living with someone who
          has this disorder, including emotional, social, and caregiving
          challenges.
        </p>
        <p className="placeholder-line">
          Placeholder details: [Add family/caregiver impact examples]
        </p>
      </section>

      <section className="doc-section">
        <h2>Research Requirements</h2>
        <ul>
          <li>Include 3-4 credible sources.</li>
          <li>Include a Works Cited page in APA format.</li>
          <li>Use current information (2015 or later).</li>
          <li>Use information grounded in the DSM-5 framework.</li>
        </ul>
      </section>

      <footer className="doc-footer">
        <Link href="/">Back to Home</Link>
        <Link href="/game">Go to Game</Link>
      </footer>
    </main>
  );
}
