import { useState } from 'react';
import { Zap } from 'lucide-react';

export function ElectricalCalc() {
  const [v, setV] = useState('');
  const [vU, setVU] = useState('V');

  const [i, setI] = useState('');
  const [iU, setIU] = useState('A');

  const [r, setR] = useState('');
  const [rU, setRU] = useState('Ω');

  const [p, setP] = useState('');
  const [pU, setPU] = useState('W');

  const multipliers: Record<string, number> = {
    'mV': 0.001, 'V': 1, 'kV': 1000,
    'mA': 0.001, 'A': 1,
    'Ω': 1, 'kΩ': 1000, 'MΩ': 1000000,
    'mW': 0.001, 'W': 1, 'kW': 1000
  };

  const formatResult = (val: number, unit: string) => {
    const adjusted = val / multipliers[unit];
    return String(Number(adjusted.toFixed(6)));
  };

  const calculate = () => {
    const baseV = v !== '' ? parseFloat(v) * multipliers[vU] : null;
    const baseI = i !== '' ? parseFloat(i) * multipliers[iU] : null;
    const baseR = r !== '' ? parseFloat(r) * multipliers[rU] : null;
    const baseP = p !== '' ? parseFloat(p) * multipliers[pU] : null;

    let newV = baseV, newI = baseI, newR = baseR, newP = baseP;

    if (newV !== null && newI !== null) {
      newR = newV / newI;
      newP = newV * newI;
    } else if (newV !== null && newR !== null) {
      newI = newV / newR;
      newP = (newV * newV) / newR;
    } else if (newI !== null && newR !== null) {
      newV = newI * newR;
      newP = newI * newI * newR;
    } else if (newP !== null && newV !== null) {
      newI = newP / newV;
      newR = (newV * newV) / newP;
    } else if (newP !== null && newI !== null) {
      newV = newP / newI;
      newR = newP / (newI * newI);
    } else if (newP !== null && newR !== null) {
      newV = Math.sqrt(newP * newR);
      newI = Math.sqrt(newP / newR);
    }

    if (newV !== null) setV(formatResult(newV, vU));
    if (newI !== null) setI(formatResult(newI, iU));
    if (newR !== null) setR(formatResult(newR, rU));
    if (newP !== null) setP(formatResult(newP, pU));
  };

  const clear = () => {
    setV(''); setI(''); setR(''); setP('');
  };

  return (
    <div className="w-full max-w-md bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-800">
      <div className="flex items-center gap-3 mb-6">
        <Zap className="text-yellow-400 w-6 h-6" />
        <h3 className="text-xl font-semibold text-white">Electrical Units Calculator</h3>
      </div>
      <p className="text-slate-400 text-sm mb-6">
        Enter any two values to calculate the others (Watts, Amps, Volts, Ohms).
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Power (Watts)</label>
          <div className="flex">
            <input
              type="number"
              value={p}
              onChange={(e) => setP(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-l-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. 24"
            />
            <select 
              value={pU} 
              onChange={(e) => setPU(e.target.value)}
              className="bg-slate-800 border-y border-r border-slate-800 rounded-r-xl px-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="mW">mW</option>
              <option value="W">W</option>
              <option value="kW">kW</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Current (Amps)</label>
          <div className="flex">
            <input
              type="number"
              value={i}
              onChange={(e) => setI(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-l-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. 2"
            />
            <select 
              value={iU} 
              onChange={(e) => setIU(e.target.value)}
              className="bg-slate-800 border-y border-r border-slate-800 rounded-r-xl px-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="mA">mA</option>
              <option value="A">A</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Voltage (Volts)</label>
          <div className="flex">
            <input
              type="number"
              value={v}
              onChange={(e) => setV(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-l-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. 12"
            />
            <select 
              value={vU} 
              onChange={(e) => setVU(e.target.value)}
              className="bg-slate-800 border-y border-r border-slate-800 rounded-r-xl px-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="mV">mV</option>
              <option value="V">V</option>
              <option value="kV">kV</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Resistance (Ohms)</label>
          <div className="flex">
            <input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-l-xl p-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="e.g. 6"
            />
            <select 
              value={rU} 
              onChange={(e) => setRU(e.target.value)}
              className="bg-slate-800 border-y border-r border-slate-800 rounded-r-xl px-3 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="Ω">Ω</option>
              <option value="kΩ">kΩ</option>
              <option value="MΩ">MΩ</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={calculate}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={clear}
            className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-colors"
          >
            Clear
          </button>
        </div>

      </div>
    </div>
  );
}
