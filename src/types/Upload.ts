// The transactions upload file.
export interface IUpload {
  account: string;
  postedOn: string;
  check: string;
  payee: string;
  category: string;
  tags: string;
  notes: string;
  state: string;
  amount: number;
}

// The raw upload data before converting amount to a number.
export interface IUploadRaw {
  account: string;
  postedOn: string;
  check: string;
  payee: string;
  category: string;
  tags: string;
  notes: string;
  state: string;
  amount: string;
}
