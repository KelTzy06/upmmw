import { useState } from 'react';

export function BMICalc() {
  const [height, setHeight] = useState('175'); // cm
  const [weight, setWeight] = useState('70'); // kg
  
  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w) return 0;
    return w / (h * h);
  };

  const bmi = calculateBMI();

  const getCategory = (bmiValue: number) => {
    if (bmiValue === 0) return { label: 'Enter values', color: 'text-slate-400' };
    if (bmiValue < 18.5) return { label: 'Underweight', color: 'text-blue-400' };
    if (bmiValue < 25) return { label: 'Normal weight', color: 'text-emerald-400' };
    if (bmiValue < 30) return { label: 'Overweight', color: 'text-yellow-400' };
    return { label: 'Obese', color: 'text-red-400' };
  };

  const category = getCategory(bmi);

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-6">BMI Calculator</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-400">Height</label>
            <span className="text-sm font-medium text-indigo-400">{height} cm</span>
          </div>
          <input
            type="range"
            min="100"
            max="250"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium text-slate-400">Weight</label>
            <span className="text-sm font-medium text-indigo-400">{weight} kg</span>
          </div>
          <input
            type="range"
            min="30"
            max="200"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />
        </div>

        <div className="mt-8 p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center">
          <div className="text-slate-400 text-sm mb-2">Your BMI</div>
          <div className="text-5xl font-bold text-white mb-2">
            {bmi ? bmi.toFixed(1) : '0.0'}
          </div>
          <div className={`text-lg font-medium ${category.color}`}>
            {category.label}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between">
          <span className="text-blue-400">&lt; 18.5</span>
          <span className="text-emerald-400">18.5 - 24.9</span>
          <span className="text-yellow-400">25 - 29.9</span>
          <span className="text-red-400">&gt; 30</span>
        </div>
      </div>
    </div>
  );
}
