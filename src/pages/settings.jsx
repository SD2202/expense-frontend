import React, { useState, useContext } from 'react';
import { User, Shield, Palette, Save, CheckCircle, ChevronRight, Moon, Sun } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';

const Settings = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock theme state - in a real app this would be in a ThemeContext
  const [theme, setTheme] = useState('dark'); 

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    
    try {
      const res = await authService.updateProfile(formData);
      dispatch({ type: 'LOGIN', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data));
      setSuccess('Profile updated successfully!');
      setFormData({ ...formData, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    {
      id: 'profile',
      title: 'Personal Details',
      icon: User,
      color: 'text-indigo-600',
      description: 'Update your account information and password'
    },
    {
      id: 'theme',
      title: 'App Theme',
      icon: Palette,
      color: 'text-emerald-600',
      description: 'Personalize your visual experience'
    },
    {
      id: 'privacy',
      title: 'Data & Privacy',
      icon: Shield,
      color: 'text-rose-600',
      description: 'Manage your data and security preferences'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 mt-2 text-lg">Manage your account preferences and application settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar Nav */}
        <div className="space-y-2">
          {sections.map((s) => (
            <button
              key={s.id}
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors`}>
                  <s.icon className={s.color} size={20} />
                </div>
                <span className="font-semibold text-slate-700">{s.title}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-8">
          {/* Personal Details Section */}
          <div className="glass-card animate-fade-in p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <User className="text-indigo-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Personal Details</h2>
                <p className="text-slate-500 text-sm">Your account information</p>
              </div>
            </div>

            {success && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 animate-slide-up">
                <CheckCircle size={20} />
                <span className="font-medium">{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-fade-in">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">New Password (optional)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="input-field w-full"
                  placeholder="Leave blank to keep current"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full sm:w-auto px-8 py-3 flex items-center justify-center gap-2"
              >
                <Save size={18} />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Theme Section */}
          <div className="glass-card p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <Palette className="text-emerald-600" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">App Theme</h2>
                <p className="text-slate-500 text-sm">Choose your preferred appearance</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${theme === 'light' ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Sun size={20} className={theme === 'light' ? 'text-emerald-600' : 'text-slate-400'} />
                  <span className={`font-bold ${theme === 'light' ? 'text-emerald-900' : 'text-slate-600'}`}>Light Mode</span>
                </div>
                {theme === 'light' && <div className="w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100"></div>}
              </button>

              <button 
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${theme === 'dark' ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-100 hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <Moon size={20} className={theme === 'dark' ? 'text-indigo-600' : 'text-slate-400'} />
                  <span className={`font-bold ${theme === 'dark' ? 'text-slate-900' : 'text-slate-600'}`}>Dark Mode (Glass)</span>
                </div>
                {theme === 'dark' && <div className="w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-indigo-100"></div>}
              </button>
            </div>
          </div>

          {/* Privacy Section */}
          <div className="glass-card p-8 opacity-75">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-rose-50 rounded-2xl">
                <Shield className="text-rose-600" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Data & Privacy</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Your data is encrypted and stored securely. We do not share your financial information with third parties. You can request a full data export or account deletion by contacting support.
            </p>
            <div className="mt-6 flex gap-4">
              <button className="text-sm font-bold text-rose-600 hover:underline">Download Data (CSV)</button>
              <button className="text-sm font-bold text-rose-600 hover:underline">Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
