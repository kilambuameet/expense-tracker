import { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FiHome, FiList, FiMenu, FiPlusCircle, FiX } from "react-icons/fi"; // hamburger & close icons
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Transactions from "./pages/Transactions";
import { TransactionProvider } from "./context/TransactionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "add":
        return <AddTransaction />;
      case "transactions":
        return <Transactions />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <TransactionProvider>
      <Router>
        <div className="flex min-h-screen bg-gray-50">
          {/* Backdrop overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          {/* Sidebar */}
          <aside
            className={`fixed z-40 top-0 left-0 h-screen bg-linear-to-b from-gray-900 to-black text-white w-72 shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky`}
          >
            <div className="flex flex-col min-h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-bold">ET</span>
                  </div>
                  <h1 className="text-xl font-bold">Expense Tracker</h1>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="md:hidden text-gray-400 hover:text-white transition"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 p-4 space-y-2">
                <button
                  onClick={() => navigateTo("dashboard")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === "dashboard"
                      ? "bg-linear-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <FiHome size={20} />
                  <span className="font-medium">Dashboard</span>
                </button>

                <button
                  onClick={() => navigateTo("add")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === "add"
                      ? "bg-linear-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <FiPlusCircle size={20} />
                  <span className="font-medium">Add Transaction</span>
                </button>

                <button
                  onClick={() => navigateTo("transactions")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    currentPage === "transactions"
                      ? "bg-linear-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30"
                      : "hover:bg-gray-800/50"
                  }`}
                >
                  <FiList size={20} />
                  <span className="font-medium">Transactions</span>
                </button>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-800">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <p className="text-sm text-gray-400">Need help?</p>
                  <p className="text-xs text-gray-500 mt-1">Contact support</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Mobile Header */}
            <header className="sticky top-0 z-20 bg-white shadow-sm p-4 flex items-center justify-between md:hidden">
              <h1 className="text-xl font-bold text-gray-800">
                Expense Tracker
              </h1>
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:text-gray-800 transition"
              >
                <FiMenu size={24} />
              </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-8">{renderPage()}</main>
          </div>
        </div>
      </Router>
      <ToastContainer position="top-right" autoClose={5000} />
    </TransactionProvider>
  );
}

export default App;
