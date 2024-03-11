export interface ITransaction {
  account: string;
  postedOn: string;
  check: string;
  payee: string;
  category: string;
  tags: string;
  notes: string;
  state: string;
  amount: number;
  nodeId: string;
}
