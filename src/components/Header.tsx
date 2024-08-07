// TODO: Save theme in localStorage.

import { Link } from "react-router-dom";
import { years } from "../data/constants";
import useGlobalContext from "../hooks/useGlobalContext";
import useAuthContext from "../hooks/useAuthContext";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const { setYear, theme, setTheme, year } = useGlobalContext();
  const handleSelectYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(event.target.value));
  };
  const { error: logoutError, pending: logoutPending, logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header>
      <div className="navbar bg-base-200 mb-4">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            Budgeting
          </Link>
        </div>
        <nav className="flex-none">
          <ul className="menu menu-horizontal px-1 items-center">
            {user && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}

            {!user && (
              <>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/login">Log In</Link>
                </li>
              </>
            )}

            {user && (
              <>
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
                <li className="ml-4">{user.email}</li>
                <li className="ml-4">
                  {!logoutPending && (
                    <button className="btn btn-secondary" onClick={logout}>
                      Log Out
                    </button>
                  )}
                  {logoutPending && (
                    <button className="btn btn-secondary" disabled>
                      Log Out
                    </button>
                  )}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div aria-live="polite">
        {logoutError && (
          <p className="alert alert-error">
            There was an error logging the user out of the application.
          </p>
        )}
      </div>

      {user && (
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
      )}
    </header>
  );
};

export default Header;
