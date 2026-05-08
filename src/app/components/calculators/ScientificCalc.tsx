import { useState } from 'react';

export function ScientificCalc() {
  const [display, setDisplay] = useState('0');

  const append = (val: string) => {
    setDisplay(prev => prev === '0' && val !== '.' ? val : prev + val);
  };

  const calculate = () => {
    try {
      // Very basic evaluation for demo purposes. Real app would use a math parser.
      let toEval = display
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
      
      const res = new Function('return ' + toEval)();
      setDisplay(String(res));
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => setDisplay('0');

  const scientificBtns = [
    { label: 'sin', action: () => append('sin(') },
    { label: 'cos', action: () => append('cos(') },
    { label: 'tan', action: () => append('tan(') },
    { label: 'log', action: () => append('log(') },
    { label: 'ln', action: () => append('ln(') },
    { label: '√', action: () => append('sqrt(') },
    { label: '^', action: () => append('^') },
    { label: 'π', action: () => append('π') },
    { label: 'e', action: () => append('e') },
    { label: '(', action: () => append('(') },
    { label: ')', action: () => append(')') },
    { label: 'C', action: clear, color: 'text-red-400 bg-red-500/10' },
  ];

  const standardBtns = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
  ];

  return (
    <div className="w-full max-w-2xl bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-800 flex flex-col md:flex-row gap-6">
      
      <div className="flex-1 flex flex-col">
        <div className="bg-slate-950 p-4 rounded-2xl mb-6 text-right overflow-hidden flex flex-col justify-end min-h-[100px]">
          <div className="text-3xl font-light text-white tracking-wider break-all">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mb-4 md:mb-0">
          {scientificBtns.map((btn, i) => (
            <button
              key={`sci-${i}`}
              onClick={btn.action}
              className={`h-12 rounded-xl text-sm font-medium transition-all active:scale-95 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 ${btn.color || ''}`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-4 gap-3 h-full">
          {standardBtns.map((btn, i) => (
            <button
              key={`std-${i}`}
              onClick={() => btn === '=' ? calculate() : append(btn)}
              className={`
                h-16 rounded-xl text-xl font-medium transition-all active:scale-95
                ${btn === '=' ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'}
                ${['/', '*', '-', '+'].includes(btn) ? 'text-indigo-400 bg-slate-800' : ''}
              `}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
