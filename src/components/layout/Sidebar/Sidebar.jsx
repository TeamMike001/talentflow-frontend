import { NavLink } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

const links = [
  ["Dashboard", ROUTES.dashboard],
  ["Courses", ROUTES.courses],
  ["Progress", ROUTES.progress],
  ["Discussions", ROUTES.discussions],
  ["Notifications", ROUTES.notifications],
  ["Profile", ROUTES.profile],
];

function Sidebar() {
  return (
    <aside className="tf-sidebar">
      <h2 className="tf-sidebar__title">Learner Menu</h2>
      <div className="tf-sidebar__links">
        {links.map(([label, to]) => (
          <NavLink key={to} className="tf-sidebar__link" to={to}>
            {label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
