export interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string; // ISO format e.g. "2025-10-29"
}
