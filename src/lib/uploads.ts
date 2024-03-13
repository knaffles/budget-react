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
    lines.forEach((line: string, index) => {
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

export const processUpload = (data: unknown[]) => {
  // TODO: Define the structure for data.
  // The first item in the object is always empty. Remove it.
  data.forEach((item, index) => {
    // Remove commas and dollar signs.
    const newAmount = item.amount.replace("$", "").replace(",", "");

    // Convert to a number.
    data[index].amount = parseFloat(newAmount);
  });

  return data;
};
