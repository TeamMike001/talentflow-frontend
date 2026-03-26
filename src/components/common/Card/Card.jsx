function Card({ title, children }) {
  return (
    <section className="tf-card">
      {title ? <h3 className="tf-card__title">{title}</h3> : null}
      {children}
    </section>
  );
}

export default Card;
