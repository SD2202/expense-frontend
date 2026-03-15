import React from 'react';
import { Trash2, ShoppingBag, Utensils, Home, Car, Zap, Heart, Gift, MoreHorizontal, Briefcase, Monitor, Building, Lock } from 'lucide-react';

const categoryIcons = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Housing: Home,
  Transportation: Car,
  Utilities: Zap,
  Health: Heart,
  Gift: Gift,
  Other: MoreHorizontal,
  Job: Briefcase,
  Freelancing: Monitor,
  Business: Building,
};

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="glass-card text-center py-16 animate-fade-in">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
          <MoreHorizontal size={32} />
        </div>
        <p className="text-slate-500 font-medium">No transactions found. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      <div className="p-6 border-b border-slate-100/50">
        <h2 className="text-2xl font-bold text-slate-800">Recent Transactions</h2>
      </div>
      <div className="overflow-x-auto p-4 max-h-[500px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-xs font-bold uppercase tracking-wider">
              <th className="pb-4 px-4">Category</th>
              <th className="pb-4 px-4">Description</th>
              <th className="pb-4 px-4">Date</th>
              <th className="pb-4 px-4 text-right">Amount</th>
              <th className="pb-4 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {transactions.map((t, i) => {
              const Icon = categoryIcons[t.category] || MoreHorizontal;
              return (
                <tr 
                  key={t._id} 
                  className="group hover:bg-white/60 transition-colors duration-200 animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-100/80 rounded-xl text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shadow-sm">
                        <Icon size={20} strokeWidth={2.5} />
                      </div>
                      <span className="font-bold text-slate-700">{t.category}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600 font-medium">{t.description}</td>
                  <td className="py-4 px-4 text-slate-500 text-sm font-medium">
                    {new Date(t.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className={`py-4 px-4 text-right font-extrabold ${
                    t.type === 'income' ? 'text-emerald-500' : 'text-slate-800'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {(() => {
                      const now = new Date();
                      const transDate = new Date(t.date);
                      const isCurrentMonth = transDate.getMonth() === now.getMonth() && transDate.getFullYear() === now.getFullYear();
                      
                      return isCurrentMonth ? (
                        <button
                          onClick={() => onDelete(t._id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                          title="Delete Transaction"
                        >
                          <Trash2 size={18} />
                        </button>
                      ) : (
                        <div className="p-2 text-slate-300" title="Past transactions cannot be deleted">
                          <Lock size={18} />
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
