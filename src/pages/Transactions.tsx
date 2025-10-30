import { useState } from "react";
import {
  useTransactions,
  type Transaction,
} from "../context/TransactionContext";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Transactions = () => {
  const { transactions, editTransaction, deleteTransaction } =
    useTransactions();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEditClick = (t: Transaction) => {
    setSelectedTransaction(t);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (t: Transaction) => {
    setSelectedTransaction(t);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedTransaction) return;
    editTransaction(selectedTransaction.id, {
      type: selectedTransaction.type,
      category: selectedTransaction.category,
      amount: selectedTransaction.amount,
      description: selectedTransaction.description,
      date: selectedTransaction.date,
    });
    setEditModalOpen(false);
  };

  const confirmDelete = () => {
    if (!selectedTransaction) return;
    deleteTransaction(selectedTransaction.id);
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        All Transactions
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No transactions yet.
                </td>
              </tr>
            ) : (
              transactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-800">{t.description}</td>
                  <td
                    className={`px-6 py-4 font-semibold ${
                      t.type === "income" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"} Rs.{t.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 capitalize">{t.type}</td>
                  <td className="px-6 py-4">{t.category}</td>
                  <td className="px-6 py-4">{t.date}</td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEditClick(t)}
                      className="px-3 py-1 bg-blue-400 rounded text-white hover:bg-blue-500 transition cursor-pointer"
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(t)}
                      className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 transition cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Transaction</h2>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={selectedTransaction.description}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
              />
              <input
                type="number"
                className="w-full border px-3 py-2 rounded"
                value={selectedTransaction.amount}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    amount: Number(e.target.value),
                  })
                }
                placeholder="Amount"
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={selectedTransaction.category}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
              />
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedTransaction.type}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    type: e.target.value as "income" | "expense",
                  })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded"
                value={selectedTransaction.date}
                onChange={(e) =>
                  setSelectedTransaction({
                    ...selectedTransaction,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={handleSaveEdit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 text-center shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete "{selectedTransaction.description}
              "?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
