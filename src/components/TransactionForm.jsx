import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TransactionForm = ({ onSubmit, expenseCategories, incomeCategories }) => {
  const now = new Date();
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
  const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: '',
    description: '',
    date: now.toISOString().split('T')[0],
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Additional validation for current month
    const selectedDate = new Date(formData.date);
    const now = new Date();
    if (selectedDate.getMonth() !== now.getMonth() || selectedDate.getFullYear() !== now.getFullYear()) {
      setError('You can only add transactions for the current month.');
      return;
    }

    setError('');
    onSubmit({ ...formData, amount: Number(formData.amount) });
    setFormData({
      amount: '',
      type: 'expense',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="glass-card h-full p-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
          <PlusCircle size={28} strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">New Transaction</h2>
          <p className="text-sm text-slate-500">Record your income and expenses</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium animate-fade-in flex items-center gap-2">
           <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
           {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="label-text">Transaction Type</label>
          <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'income', category: '' })}
              className={`py-2.5 px-4 rounded-lg font-bold transition-all duration-300 ${
                formData.type === 'income'
                  ? 'bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, type: 'expense', category: '' })}
              className={`py-2.5 px-4 rounded-lg font-bold transition-all duration-300 ${
                formData.type === 'expense'
                  ? 'bg-white text-rose-600 shadow-sm ring-1 ring-slate-200'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
              }`}
            >
              Expense
            </button>
          </div>
        </div>

        <div>
          <label className="label-text">Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="input-field pl-8 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="label-text">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field cursor-pointer"
            required
          >
            <option value="" disabled>Select Category</option>
            {(formData.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label-text">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="What was this for?"
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="label-text">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input-field cursor-pointer"
            min={currentMonthStart}
            max={currentMonthEnd}
            required
          />
        </div>

        <button type="submit" className="btn-primary w-full mt-6 py-3.5 text-lg group">
          <PlusCircle size={20} className="transition-transform group-hover:rotate-90 duration-300" />
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
