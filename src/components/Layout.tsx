import { useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalContext from "../contexts/GlobalContext";
import Header from "./Header";
import { useAppSelector } from "../app/hooks";
import { selectTheme } from "../state/themeSlice";

const Layout = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const theme = useAppSelector(selectTheme);

  return (
    <GlobalContext.Provider value={{ year, setYear }}>
      <div
        className="p-4 flex flex-col w-full min-h-[100vh]"
        data-theme={theme}
      >
        <div className="w-full max-w-[90rem] mx-auto mr-auto grow">
          <Header />
          <hr className="my-4" />
          <Outlet />
        </div>
      </div>
    </GlobalContext.Provider>
  );
};
export default Layout;
