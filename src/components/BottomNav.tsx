import { NavLink } from "react-router-dom";

const IconFork = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M8 3v8M6 3v5a2 2 0 0 0 4 0V3M10 11v10M16 3c0 4 0 6-2 8v10" />
  </svg>
);

const IconCar = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M3 13h18l-1.5-5H4.5L3 13z" />
    <path d="M5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM19 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M5 13V9h14v4" />
  </svg>
);

const IconBell = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 17h12l-1-2V10a5 5 0 0 0-10 0v5l-1 2z" />
    <path d="M10 17a2 2 0 0 0 4 0" />
    <path d="M8 8h8" />
  </svg>
);

const IconBroom = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M14 4l6 6" />
    <path d="M13 7l4 4-8 8H5v-4l8-8z" />
  </svg>
);

const IconGenie = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7">
    <path d="M8 11c0-2 2-4 4-4s4 2 4 4v1H8v-1z" />
    <path d="M7 13h10v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-2z" />
    <path d="M12 4v3M9 5.5 12 4l3 1.5" />
  </svg>
);

export function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dining" className="nav-orb">
        <IconFork />
      </NavLink>
      <NavLink to="/" className="nav-orb">
        <IconCar />
      </NavLink>
      <NavLink to="/genie" className="nav-orb nav-orb--genie">
        <IconGenie />
        <span>GENIE</span>
      </NavLink>
      <NavLink to="/dining" className="nav-orb">
        <IconBell />
      </NavLink>
      <NavLink to="/" className="nav-orb">
        <IconBroom />
      </NavLink>
    </nav>
  );
}
