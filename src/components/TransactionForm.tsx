import React, { useState } from "react";
import type { Transaction } from "../types/transaction";
import { toast } from "react-toastify";

interface TransactionFormProps {
  onAddTransaction: (txn: Transaction) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onAddTransaction,
}) => {
  const [formData, setFormData] = useState<{
    type: "income" | "expense";
    category: string;
    amount: string;
    description: string;
    date: string;
  }>({
    type: "income",
    category: "",
    amount: "",
    description: "",
    date: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const transaction: Transaction = {
      id: Date.now().toString(), // simple unique id
      ...formData,
      amount: parseFloat(formData.amount),
    };

    onAddTransaction(transaction);
    toast.success("Transaction recorded successfully!");

    setFormData({
      type: "income",
      category: "",
      amount: "",
      description: "",
      date: "",
    });
  };

  return (
    <section className="bg-white shadow-md rounded-xl p-6 w-full ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Add Transaction
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Salary, Food, Rent"
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Monthly Salary"
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
        >
          Add Transaction
        </button>
      </form>
    </section>
  );
};

export default TransactionForm;
