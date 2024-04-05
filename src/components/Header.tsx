// TODO: Save theme in localStorage.

import { Link } from "react-router-dom";
import { years } from "../data/constants";
import useAppContext from "../hooks/useAppContext";

const Header = () => {
  const { setYear, theme, setTheme, year } = useAppContext();
  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };

  return (
    <header>
      <div className="navbar bg-base-200 mb-4">
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
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/budget">Budget</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/import">Import</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-between">
        <label className="flex items-center">
          <div className="label">
            <span className="label-text">Select the year:</span>
          </div>
          <select
            className="select select-bordered select-sm"
            onChange={handleSelectYear}
            value={year}
          >
            {years.map((year) => {
              return (
                <option value={year} key={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </label>

        <button
          className="btn btn-primary"
          onClick={() => {
            if (theme === "light") {
              setTheme("dark");
            } else {
              setTheme("light");
            }
          }}
        >
          Switch theme
        </button>
      </div>
    </header>
  );
};

export default Header;
