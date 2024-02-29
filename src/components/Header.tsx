import classes from "./header.module.css";

const Header = () => {
  return (
    <header className={`${classes.header} items-center flex gap-8`}>
      <h1>Budgeting</h1>
      <button className="btn btn-primary">Test button</button>
    </header>
  );
};

export default Header;
