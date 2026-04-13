import Link from "next/link";

export default function HandoutPage() {
  return (
    <main className="doc-shell handout-shell">
      <header className="doc-header">
        <div className="doc-hero">
          <div className="doc-hero-top">
            <div className="flex flex-wrap items-center gap-3">
              <p className="doc-topic-chip">Student Handout</p>
              <p className="doc-topic-chip">AP Psychology Study Guide</p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:no-underline"
            >
              Home
            </Link>
          </div>

          <h1>Persistent Depressive Disorder (Dysthymia)</h1>
          <p className="lead">
            Persistent Depressive Disorder (PDD), previously called dysthymia,
            is a chronic form of depression in which a person experiences a
            depressed mood for most of the day, more days than not, for at
            least 2 years. For children and adolescents, the required duration
            is at least 1 year.
          </p>

          <div className="doc-hero-grid">
            <article className="doc-hero-card">
              <span className="doc-hero-label">Duration</span>
              <p>At least 2 years in adults, or 1 year in children/adolescents.</p>
            </article>
            <article className="doc-hero-card">
              <span className="doc-hero-label">Core Pattern</span>
              <p>Depressed mood most of the day, more days than not.</p>
            </article>
            <article className="doc-hero-card">
              <span className="doc-hero-label">Why It Matters</span>
              <p>
                Symptoms may appear less intense than major depression, but they
                are long-lasting and can disrupt daily life.
              </p>
            </article>
          </div>
        </div>
      </header>

      <section className="doc-section">
        <div className="doc-panel">
          <h2>Component 1: Definition &amp; Diagnosis</h2>
          <p>
            Psychologists diagnose PDD using clinical interviews, behavioral
            observations, and the DSM-5 diagnostic criteria.
          </p>
          <p>To be diagnosed with PDD, an individual must have:</p>
          <ul className="doc-checklist">
            <li>Depressed mood most of the time</li>
            <li>At least two of the following symptoms:</li>
            <li>Poor appetite or overeating</li>
            <li>Insomnia or hypersomnia</li>
            <li>Low energy or fatigue</li>
            <li>Low self-esteem</li>
            <li>Poor concentration or difficulty making decisions</li>
            <li>Feelings of hopelessness</li>
          </ul>
          <p>Additional requirements include:</p>
          <ul className="doc-checklist">
            <li>
              Symptoms persist for at least 2 years without a break longer than
              2 months
            </li>
            <li>Symptoms cause significant distress or impairment in daily life</li>
            <li>
              Symptoms are not better explained by another disorder or substance
              use
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <h2>Component 2: Causes (Biopsychosocial Perspective)</h2>
        <div className="doc-card-grid">
          <article className="doc-card">
            <p className="doc-card-tag">Biological Factors</p>
            <ul className="doc-checklist">
              <li>Genetic predisposition, because depression can run in families</li>
              <li>
                Imbalance of neurotransmitters, especially serotonin and
                norepinephrine
              </li>
              <li>
                Differences in brain regions involved in mood regulation, such
                as the prefrontal cortex
              </li>
            </ul>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Psychological Factors</p>
            <ul className="doc-checklist">
              <li>Negative thinking patterns and cognitive distortions</li>
              <li>Low self-esteem and pessimism</li>
              <li>Poor coping skills when dealing with stress</li>
            </ul>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Environmental Factors</p>
            <ul className="doc-checklist">
              <li>Chronic stress, including financial, academic, or social stress</li>
              <li>Childhood adversity or trauma</li>
              <li>Lack of social support</li>
            </ul>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Research Summary</p>
            <p>
              Most researchers believe PDD develops from a combination of
              biological, psychological, and environmental influences rather
              than a single cause.
            </p>
          </article>
        </div>
      </section>

      <section className="doc-section">
        <h2>Component 3: Treatment Options</h2>
        <div className="doc-card-grid">
          <article className="doc-card">
            <p className="doc-card-tag">Cognitive Behavioral Therapy (CBT)</p>
            <p>
              CBT helps individuals identify and challenge negative thought
              patterns and replace them with healthier ways of thinking, which
              can improve mood and behavior over time.
            </p>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Interpersonal Therapy (IPT)</p>
            <p>
              IPT focuses on improving relationships and communication skills,
              which can reduce depressive symptoms and strengthen social
              support.
            </p>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Behavioral Activation</p>
            <p>
              Behavioral activation encourages individuals to take part in
              positive and meaningful activities, helping interrupt the cycle of
              withdrawal and low mood.
            </p>
          </article>

          <article className="doc-card">
            <p className="doc-card-tag">Antidepressants (SSRIs, SNRIs)</p>
            <p>
              These medications increase levels of neurotransmitters such as
              serotonin, which can help regulate mood and reduce depressive
              symptoms.
            </p>
          </article>
        </div>

        <div className="doc-panel">
          <h3>How Treatment Helps</h3>
          <ul className="doc-checklist">
            <li>Therapy addresses harmful thinking and behavior patterns</li>
            <li>Medication targets brain chemistry related to mood</li>
            <li>
              Together, they can help people manage symptoms and improve daily
              functioning
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section">
        <div className="doc-panel">
          <h2>Component 4: A Day in the Life</h2>
          <p>
            A person with PDD may appear functional on the outside, but still
            struggle internally with a constant low mood.
          </p>
          <ul className="doc-checklist">
            <li>They may wake up feeling tired and unmotivated, even after sleeping</li>
            <li>Simple tasks like schoolwork or chores can feel overwhelming</li>
            <li>Low energy and poor concentration can make daily work harder</li>
            <li>
              Social interactions may feel exhausting, which can lead to
              withdrawal
            </li>
            <li>They may experience ongoing feelings of inadequacy or hopelessness</li>
          </ul>
          <p>
            Unlike major depressive disorder, the symptoms of PDD are often less
            intense but much more long-lasting, which can make life feel like a
            constant emotional weight.
          </p>
        </div>
      </section>

      <section className="doc-section">
        <div className="doc-panel">
          <h2>Component 5: Impact on Family Members</h2>
          <p>Living with someone who has PDD can affect family life in several ways.</p>
          <div className="doc-card-grid">
            <article className="doc-card">
              <p className="doc-card-tag">Emotional Challenges</p>
              <ul className="doc-checklist">
                <li>Family members may feel worried, frustrated, or helpless</li>
                <li>
                  It may be hard to understand why the person cannot simply feel
                  better
                </li>
              </ul>
            </article>

            <article className="doc-card">
              <p className="doc-card-tag">Social Challenges</p>
              <ul className="doc-checklist">
                <li>Reduced participation in family activities</li>
                <li>Strain on relationships because of withdrawal or negativity</li>
              </ul>
            </article>

            <article className="doc-card">
              <p className="doc-card-tag">Caregiving Challenges</p>
              <ul className="doc-checklist">
                <li>Providing steady emotional support can be mentally exhausting</li>
                <li>Family members may need to encourage treatment adherence</li>
              </ul>
            </article>

            <article className="doc-card">
              <p className="doc-card-tag">Support Matters</p>
              <p>
                Even with these challenges, supportive and understanding family
                relationships can improve recovery outcomes.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="doc-section">
        <div className="doc-panel">
          <h2>Works Cited</h2>
          <div className="works-cited">
            <p>
              American Psychiatric Association. (2013). <em>
                Diagnostic and statistical manual of mental disorders
              </em>{" "}
              (5th ed.). Washington, DC: Author.
            </p>
            <p>
              National Institute of Mental Health. (2023). <em>
                Persistent depressive disorder (dysthymia)
              </em>
              . https://www.nimh.nih.gov
            </p>
            <p>
              Mayo Clinic Staff. (2022). <em>
                Persistent depressive disorder (dysthymia)
              </em>
              . https://www.mayoclinic.org
            </p>
            <p>
              Cleveland Clinic. (2021). <em>
                Persistent depressive disorder (PDD)
              </em>
              . https://my.clevelandclinic.org
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
