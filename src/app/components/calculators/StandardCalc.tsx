import { useState } from 'react';

export function StandardCalc() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setEquation('');
      return;
    }
    
    if (val === '=') {
      try {
        // Safe evaluation alternative to eval for simple math
        const result = new Function('return ' + display.replace(/x/g, '*').replace(/÷/g, '/'))();
        setEquation(display + ' =');
        setDisplay(String(result));
      } catch (e) {
        setDisplay('Error');
      }
      return;
    }

    if (display === '0' && val !== '.') {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const buttons = [
    'C', '(', ')', '÷',
    '7', '8', '9', 'x',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '=', 
  ];

  return (
    <div className="w-full max-w-sm bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800">
      <div className="bg-slate-950 p-4 rounded-2xl mb-6 text-right overflow-hidden flex flex-col justify-end min-h-[100px]">
        <div className="text-slate-500 text-sm h-5 mb-1">{equation}</div>
        <div className="text-4xl font-light text-white tracking-wider break-all">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={() => handlePress(btn)}
            className={`
              h-16 rounded-2xl text-xl font-medium transition-all active:scale-95
              ${btn === 'C' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 col-span-1' : ''}
              ${btn === '=' ? 'bg-indigo-600 text-white hover:bg-indigo-700 col-span-2' : ''}
              ${['÷', 'x', '-', '+', '(', ')'].includes(btn) && btn !== 'C' && btn !== '=' 
                ? 'bg-slate-800 text-indigo-400 hover:bg-slate-700' 
                : ''}
              ${!['C', '=', '÷', 'x', '-', '+', '(', ')'].includes(btn) 
                ? 'bg-slate-800/50 text-slate-200 hover:bg-slate-700' 
                : ''}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}
