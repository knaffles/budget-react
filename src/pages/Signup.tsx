import Heading from "../components/Heading";
import { useState } from "react";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error, pending, signup } = useSignup();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    signup(username, password);
  };

  return (
    <>
      <Heading as="h1">Sign Up</Heading>

      <form className="max-w-2xl m-auto my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label pt-0">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              onChange={(event) => setUsername(event.target.value)}
              value={username}
            />
          </label>
          <label className="form-control w-full">
            <div className="label pt-0">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              className="input input-bordered w-full"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </label>

          <div aria-live="polite" role="alert">
            {error && <p className="alert alert-error">{error}</p>}
          </div>

          {!pending && (
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          )}
          {pending && (
            <button className="btn btn-primary" disabled>
              Sign Up
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Signup;
