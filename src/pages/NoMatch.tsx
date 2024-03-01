import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <>
      <h1>Page Not Found</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  );
};

export default NoMatch;
