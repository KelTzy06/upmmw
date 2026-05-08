import { useState } from 'react';

export function BaseConverter() {
  const [decimal, setDecimal] = useState('0');
  const [binary, setBinary] = useState('0');
  const [hex, setHex] = useState('0');
  const [octal, setOctal] = useState('0');

  const updateFromDecimal = (val: string) => {
    if (val === '') val = '0';
    const num = parseInt(val, 10);
    if (isNaN(num)) return;
    
    setDecimal(val);
    setBinary(num.toString(2));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const updateFromBinary = (val: string) => {
    // Only allow binary chars
    val = val.replace(/[^01]/g, '');
    if (val === '') val = '0';
    setBinary(val);
    
    const num = parseInt(val, 2);
    setDecimal(num.toString(10));
    setHex(num.toString(16).toUpperCase());
    setOctal(num.toString(8));
  };

  const updateFromHex = (val: string) => {
    val = val.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    if (val === '') val = '0';
    setHex(val);
    
    const num = parseInt(val, 16);
    setDecimal(num.toString(10));
    setBinary(num.toString(2));
    setOctal(num.toString(8));
  };

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
      <h3 className="text-xl font-semibold text-white mb-6">Programmer / Base</h3>
      
      <div className="space-y-4">
        
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
          <label className="block text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Decimal (Base 10)</label>
          <input
            type="text"
            value={decimal}
            onChange={(e) => updateFromDecimal(e.target.value)}
            className="w-full bg-transparent text-2xl text-white focus:outline-none"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
          <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Binary (Base 2)</label>
          <input
            type="text"
            value={binary}
            onChange={(e) => updateFromBinary(e.target.value)}
            className="w-full bg-transparent text-2xl text-white focus:outline-none tracking-widest font-mono"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors">
          <label className="block text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Hexadecimal (Base 16)</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            className="w-full bg-transparent text-2xl text-white focus:outline-none font-mono"
          />
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 focus-within:border-indigo-500 transition-colors opacity-70">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Octal (Base 8)</label>
          <input
            type="text"
            readOnly
            value={octal}
            className="w-full bg-transparent text-xl text-slate-300 focus:outline-none font-mono"
          />
        </div>

      </div>
    </div>
  );
}
