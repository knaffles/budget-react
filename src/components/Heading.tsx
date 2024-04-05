import { FC, ReactNode } from "react";

export interface IHeading {
  as: Extract<
    keyof JSX.IntrinsicElements,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  >;
  classes?: string;
  children: ReactNode;
}

const Heading: FC<IHeading> = ({ as: As, children }) => {
  return (
    <div className="prose">
      <As>{children}</As>
    </div>
  );
};

export default Heading;
