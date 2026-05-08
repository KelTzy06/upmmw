import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';

const conversionRates: Record<string, number> = {
  // Base is meters for length
  'm': 1,
  'km': 1000,
  'cm': 0.01,
  'mm': 0.001,
  'in': 0.0254,
  'ft': 0.3048,
  'yd': 0.9144,
  'mi': 1609.34,
};

const units = [
  { value: 'm', label: 'Meters (m)' },
  { value: 'km', label: 'Kilometers (km)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'mm', label: 'Millimeters (mm)' },
  { value: 'in', label: 'Inches (in)' },
  { value: 'ft', label: 'Feet (ft)' },
  { value: 'yd', label: 'Yards (yd)' },
  { value: 'mi', label: 'Miles (mi)' },
];

export function UnitConverter() {
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('ft');
  const [value, setValue] = useState('1');

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return 0;
    
    // Convert to base (meters) first, then to target
    const inMeters = val * conversionRates[fromUnit];
    const result = inMeters / conversionRates[toUnit];
    
    // Format nicely
    return result % 1 === 0 ? result : result.toFixed(4);
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-6">Length Converter</h3>
      
      <div className="space-y-6">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">From</label>
          <div className="flex gap-4">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-1/2 bg-transparent text-3xl text-white focus:outline-none"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-1/2 bg-slate-800 border-none text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex justify-center -my-2 relative z-10">
          <button 
            onClick={handleSwap}
            className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg transition-transform hover:rotate-180"
          >
            <ArrowRightLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">To</label>
          <div className="flex gap-4 items-center">
            <div className="w-1/2 bg-transparent text-3xl text-indigo-400 overflow-hidden text-ellipsis">
              {convert()}
            </div>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-1/2 bg-slate-800 border-none text-white rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            >
              {units.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
