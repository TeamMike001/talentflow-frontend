import { Link } from "react-router-dom";
import { ROUTES } from "../utils/constants";

function NotFoundPage() {
  return (
    <div className="page-shell">
      <h1 className="page-title">Page Not Found</h1>
      <p className="page-copy">The route you visited does not exist yet in the LMS scaffold.</p>
      <p>
        <Link to={ROUTES.landing}>Return to landing page</Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
