import Card from "./Card/Card";

function PagePlaceholder({ title, description, sections = [] }) {
  return (
    <div className="page-shell">
      <h1 className="page-title">{title}</h1>
      <p className="page-copy">{description}</p>
      <div className="tf-grid">
        {sections.map((section) => (
          <Card key={section.title} title={section.title}>
            <p className="page-copy">{section.copy}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PagePlaceholder;
