import { roundTwoDigits } from "../lib/utils";

const FormattedData = ({ data }: { data: number }) => {
  return (
    <>
      {data < 0 && <span className="negative">{roundTwoDigits(data)}</span>}
      {data >= 0 && <span>{roundTwoDigits(data)}</span>}
    </>
  );
};

export default FormattedData;
