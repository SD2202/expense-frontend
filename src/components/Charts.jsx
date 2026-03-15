import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Charts = ({ transactions }) => {
  // Pie Chart Data (Category Distribution)
  const categoryData = transactions.reduce((acc, t) => {
    if (t.type === 'expense') {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
    }
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: [
          '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: ['Expenses', 'Income'],
    datasets: [
      {
        label: 'Current Distribution',
        data: [
          transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0),
          transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0),
        ],
        backgroundColor: ['#ef4444', '#10b981'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="glass-card p-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <h3 className="text-xl font-extrabold text-slate-800 mb-6">Expense Distribution</h3>
        <div className="h-96 flex justify-center w-full">
          {Object.keys(categoryData).length > 0 ? (
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-400">
              <div className="bg-slate-50 p-4 rounded-full mb-3">
                <PieChart size={32} className="text-slate-300" />
              </div>
              <p className="font-medium">No expenses recorded yet</p>
            </div>
          )}
        </div>
      </div>
      <div className="glass-card p-10 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="text-xl font-extrabold text-slate-800 mb-6">Cash Flow</h3>
        <div className="h-96 flex justify-center w-full">
            <Bar 
              data={barData} 
              options={{ 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
        </div>
      </div>
    </div>
  );
};

export default Charts;
