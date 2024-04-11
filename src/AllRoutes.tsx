import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import useAuthContext from "./hooks/useAuthContext";
import Budget from "./pages/Budget";
import Categories from "./pages/Categories";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";
import Import from "./pages/Import";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Signup from "./pages/Signup";

const AllRoutes = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Not logged in */}
        <Route
          path="signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />

        {/* Logged in */}
        <Route index element={!user ? <Navigate to="/login" /> : <Home />} />
        <Route
          path="budget"
          element={!user ? <Navigate to="/login" /> : <Budget />}
        />
        <Route
          path="categories"
          element={!user ? <Navigate to="/login" /> : <Categories />}
        />
        <Route
          path="expenses"
          element={!user ? <Navigate to="/login" /> : <Expenses />}
        />
        <Route
          path="import"
          element={!user ? <Navigate to="/login" /> : <Import />}
        />

        {/* Using path="*"" means "match anything", so this route
    acts like a catch-all for URLs that we don't have explicit
    routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
export default AllRoutes;
