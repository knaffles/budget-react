import { Link } from "react-router-dom";
import Heading from "../components/Heading";

const NoMatch = () => {
  return (
    <>
      <Heading as="h1">Page Not Found</Heading>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </>
  );
};

export default NoMatch;
