function Input({ label, id, ...props }) {
  return (
    <label className="tf-field" htmlFor={id}>
      {label && <span className="tf-field__label">{label}</span>}
      <input className="tf-field__input" id={id} {...props} />
    </label>
  );
}

export default Input;
