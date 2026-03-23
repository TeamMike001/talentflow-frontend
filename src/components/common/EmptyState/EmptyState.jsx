function EmptyState({ title = "No data yet.", description = "" }) {
  return (
    <div>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export default EmptyState;
