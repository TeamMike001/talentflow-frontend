function Button({ children, type = "button", variant = "primary", ...props }) {
  return (
    <button className={`tf-button tf-button--${variant}`} type={type} {...props}>
      {children}
    </button>
  );
}

export default Button;
