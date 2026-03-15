import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const Card = ({ title, amount, icon: Icon, color, bg, gradient }) => (
  <div className="glass-card group relative overflow-hidden p-6 animate-slide-up">
    <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} opacity-10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700`}></div>
    <div className="flex items-center gap-5 relative z-10">
      <div className={`p-4 rounded-2xl ${bg} ${color} shadow-sm transition-transform group-hover:scale-110 duration-300`}>
        <Icon size={28} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
        <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          ₹{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </h3>
      </div>
    </div>
  </div>
);

const DashboardCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pt-4">
      <div style={{ animationDelay: '0ms' }}>
        <Card
          title="Total Balance"
          amount={summary.balance || 0}
          icon={Wallet}
          color="text-indigo-600"
          bg="bg-indigo-50 border border-indigo-100"
          gradient="bg-indigo-500"
        />
      </div>
      <div style={{ animationDelay: '100ms' }}>
        <Card
          title="Total Income"
          amount={summary.income || 0}
          icon={TrendingUp}
          color="text-emerald-600"
          bg="bg-emerald-50 border border-emerald-100"
          gradient="bg-emerald-500"
        />
      </div>
      <div style={{ animationDelay: '200ms' }}>
        <Card
          title="Total Expenses"
          amount={summary.expense || 0}
          icon={TrendingDown}
          color="text-rose-600"
          bg="bg-rose-50 border border-rose-100"
          gradient="bg-rose-500"
        />
      </div>
    </div>
  );
};

export default DashboardCards;
