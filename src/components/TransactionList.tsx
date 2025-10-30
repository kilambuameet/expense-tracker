import React from "react";
import type { Transaction } from "../types/transaction";


interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6">No transactions yet.</p>
    );
  }

  return (
    <section className="mt-8 bg-white shadow-md rounded-xl p-6 max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Transaction History
      </h2>

      <ul className="divide-y divide-gray-200">
        {transactions.map((txn, index) => (
          <li key={index} className="py-3 flex justify-between">
            <div>
              <p className="font-medium">{txn.category}</p>
              <p className="text-sm text-gray-500">{txn.description}</p>
              <p className="text-xs text-gray-400">{txn.date}</p>
            </div>
            <p
              className={`font-semibold ${
                txn.type === "income" ? "text-green-600" : "text-red-500"
              }`}
            >
              {txn.type === "income" ? "+" : "-"}${txn.amount}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TransactionList;
