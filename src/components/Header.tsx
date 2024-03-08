// TODO: Save theme in localStorage.

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { years } from "../data/constants";

const Header = () => {
  const appContext = useContext(AppContext);
  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    appContext?.setYear && appContext.setYear(parseInt(event.target.value));
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
              <Link to="/budget">Budget</Link>
            </li>
            <li>
              <Link to="/expenses">Expenses</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
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
            value={appContext?.year ?? ""}
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
            if (appContext?.theme === "light") {
              appContext?.setTheme("dark");
            } else {
              appContext?.setTheme("light");
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
