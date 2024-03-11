import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <hr className="my-4" />
      <Outlet />
    </>
  );
};
export default Layout;
