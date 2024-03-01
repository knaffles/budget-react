import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="navbar bg-base-200 mb-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Budgeting
        </Link>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/budget">Budget</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <nav></nav>
    </header>
  );
};

export default Header;
