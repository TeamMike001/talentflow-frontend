export default function SiteShell({ title, description, children }) {
  return (
    <main className="page-shell">
      <h1 className="page-title">{title}</h1>
      {description ? <p className="page-copy">{description}</p> : null}
      {children}
    </main>
  );
}
