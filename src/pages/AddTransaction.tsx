import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../context/TransactionContext";

const AddTransaction = () => {
  const { addTransaction } = useTransactions();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Transaction</h1>
      <TransactionForm onAddTransaction={addTransaction} />
    </div>
  );
};

export default AddTransaction;
