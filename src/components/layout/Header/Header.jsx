function Header({ title, description }) {
  return (
    <header>
      <h1 className="page-title">{title}</h1>
      {description ? <p className="page-copy">{description}</p> : null}
    </header>
  );
}

export default Header;
