export default function Loading() {
  return (
    <main className="site-loading" aria-label="Loading page">
      <div className="loading-orb" aria-hidden="true" />
      <p className="loading-kicker">AP Psychology</p>
      <h1>Loading the project...</h1>
      <div className="loading-bar" aria-hidden="true">
        <span />
      </div>
    </main>
  );
}
