import { useState } from 'react';
import { DollarSign, Percent, Calendar, Wallet, Target, Plus, Minus } from 'lucide-react';

export function FinancialCalc() {
  const [activeTab, setActiveTab] = useState<'tracker' | 'loan'>('tracker');

  // Tracker State
  const [goal, setGoal] = useState('10000');
  const [timeValue, setTimeValue] = useState(1);
  const [timeUnit, setTimeUnit] = useState('years');

  // Loan State
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('5');
  const [loanResult, setLoanResult] = useState<number | null>(null);

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (p && r && n) {
      const monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setLoanResult(monthlyPayment);
    }
  };

  const getSavingsBreakdown = () => {
    const g = parseFloat(goal) || 0;
    let totalWeeks = 0;
    let totalMonths = 0;
    let totalYears = 0;

    if (timeUnit === 'weeks') {
      totalWeeks = timeValue;
      totalMonths = timeValue / 4.333;
      totalYears = timeValue / 52;
    } else if (timeUnit === 'months') {
      totalWeeks = timeValue * 4.333;
      totalMonths = timeValue;
      totalYears = timeValue / 12;
    } else {
      totalWeeks = timeValue * 52;
      totalMonths = timeValue * 12;
      totalYears = timeValue;
    }

    return {
      weekly: totalWeeks > 0 ? g / totalWeeks : 0,
      monthly: totalMonths > 0 ? g / totalMonths : 0,
      yearly: totalYears > 0 ? g / totalYears : 0,
    };
  };

  const savings = getSavingsBreakdown();

  return (
    <div className="w-full max-w-md bg-slate-900 p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-800 h-full max-h-[800px] overflow-y-auto custom-scrollbar">
      <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'tracker' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          Savings Tracker
        </button>
        <button
          onClick={() => setActiveTab('loan')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'loan' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-4 h-4" />
          Loan Calc
        </button>
      </div>

      {activeTab === 'tracker' ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Target Goal Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 transition-all text-lg font-semibold"
                placeholder="e.g. 5000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Timeframe to Save</label>
            <div className="flex items-stretch gap-2">
              <button 
                onClick={() => setTimeValue(Math.max(1, timeValue - 1))}
                className="px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              
              <input
                type="number"
                min="1"
                value={timeValue}
                onChange={(e) => setTimeValue(parseInt(e.target.value) || 1)}
                className="w-20 text-center py-3 border border-slate-700 rounded-xl bg-slate-950 text-white font-bold focus:ring-2 focus:ring-indigo-500"
              />
              
              <button 
                onClick={() => setTimeValue(timeValue + 1)}
                className="px-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>

              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-3 text-white font-medium focus:ring-2 focus:ring-indigo-500"
              >
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Required Savings</h4>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Per Week</span>
              <span className="text-xl font-bold text-emerald-400">${savings.weekly.toFixed(2)}</span>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center relative overflow-hidden shadow-lg border-indigo-500/30">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
              <span className="text-slate-300 font-medium pl-2">Per Month</span>
              <span className="text-2xl font-bold text-white">${savings.monthly.toFixed(2)}</span>
            </div>
            
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-slate-400 font-medium">Per Year</span>
              <span className="text-xl font-bold text-indigo-400">${savings.yearly.toFixed(2)}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Loan Amount (Principal)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Interest Rate (%)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Percent className="h-4 w-4 text-slate-500" />
              </div>
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Loan Term (Years)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-white focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          <button
            onClick={calculateLoan}
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            Calculate Monthly Payment
          </button>

          {loanResult !== null && (
            <div className="mt-6 p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center">
              <div className="text-slate-400 text-sm mb-1">Estimated Monthly Payment</div>
              <div className="text-3xl font-bold text-emerald-400">
                ${loanResult.toFixed(2)}
              </div>
              <div className="text-slate-500 text-xs mt-2">
                Total Payment: ${(loanResult * parseFloat(years) * 12).toFixed(2)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
