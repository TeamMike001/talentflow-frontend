import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

function Navbar() {
  return (
    <nav className="tf-navbar">
      <Link to={ROUTES.landing}>TalentFlow</Link>
      <div className="tf-navbar__links">
        <Link to={ROUTES.signin}>Sign In</Link>
        <Link to={ROUTES.signup}>Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
