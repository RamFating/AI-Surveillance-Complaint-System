import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/login", label: "Login" },
  { to: "/admin", label: "Admin Dashboard" }
];

function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="topbar__badge">Smart City</span>
        <div>
          <h1>AI Surveillance Complaint System</h1>
          <p>Citizen reporting with real-time intelligence</p>
        </div>
      </div>

      <nav className="topbar__nav" aria-label="Primary navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-link nav-link--active" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
