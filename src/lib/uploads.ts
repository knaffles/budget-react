import { IUpload, IUploadRaw } from "../types/Upload";

// Preprocess the file, removing commas from the start of each line.
export const preProcessUpload = (
  file: File,
  callBackFn: (result: string) => void
) => {
  const reader = new FileReader();

  // Define a function to call when the file is read.
  reader.onload = function () {
    const contents = reader.result;
    let newString: string = "";

    // Create an array of each line of the file.
    const lines = (<string>contents).split(/[\r\n]+/g); // Tolerate both Windows and Unix linebreaks

    // If the first character is a comma, remove it.
    lines.forEach((line: string) => {
      if (line.charAt(0) === ",") {
        newString += line.substring(1) + "\n";
      } else {
        newString += line + "\n";
      }
    });

    callBackFn(newString);
  };

  // Read the file.
  reader.readAsText(file);
};

export const processUpload = (data: IUploadRaw[]) => {
  const newData: IUpload[] = [];
  data.forEach((item) => {
    // Remove commas and dollar signs.
    let newAmount: string | number = item.amount
      .replace("$", "")
      .replace(",", "");
    newAmount = parseFloat(newAmount);

    // Convert to a number.
    const newItem = { ...item, amount: newAmount };

    newData.push(newItem);
  });

  return data;
};
