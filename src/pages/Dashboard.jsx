import React, { useState, useEffect } from 'react';
import { transactionService } from '../services/api';
import DashboardCards from '../components/DashboardCards';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Charts from '../components/Charts';
import { LayoutDashboard, RefreshCcw } from 'lucide-react';

const expenseCategories = [
  'Food',
  'Shopping',
  'Housing',
  'Transportation',
  'Utilities',
  'Health',
  'Gift',
  'Other',
];

const incomeCategories = [
  'Job',
  'Freelancing',
  'Business',
  'Other',
];

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [transRes, summaryRes] = await Promise.all([
        transactionService.getTransactions(),
        transactionService.getSummary(),
      ]);
      setTransactions(transRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTransaction = async (data) => {
    try {
      await transactionService.addTransaction(data);
      fetchData();
    } catch (err) {
      console.error('Error adding transaction', err);
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionService.deleteTransaction(id);
      fetchData();
    } catch (err) {
      console.error('Error deleting transaction', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <LayoutDashboard className="text-indigo-600" size={32} />
            Financial Dashboard
          </h1>
          <p className="text-slate-500 mt-1">Monitor your income, expenses and savings</p>
        </div>
        <button 
          onClick={fetchData} 
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
        >
          <RefreshCcw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh Data
        </button>
      </div>

      <DashboardCards summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TransactionForm onSubmit={handleAddTransaction} expenseCategories={expenseCategories} incomeCategories={incomeCategories} />
        </div>
        
        <div className="lg:col-span-2 space-y-8">
          <Charts transactions={transactions} />
          <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
