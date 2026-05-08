import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { 
  Hexagon, LogOut, Calculator, FlaskConical, DollarSign, 
  Scale, Activity, Binary, Zap, Menu, X
} from 'lucide-react';

import { StandardCalc } from './calculators/StandardCalc';
import { ScientificCalc } from './calculators/ScientificCalc';
import { FinancialCalc } from './calculators/FinancialCalc';
import { UnitConverter } from './calculators/UnitConverter';
import { BMICalc } from './calculators/BMICalc';
import { BaseConverter } from './calculators/BaseConverter';
import { ElectricalCalc } from './calculators/ElectricalCalc';

type CalcType = 'standard' | 'scientific' | 'financial' | 'units' | 'bmi' | 'base' | 'electrical';

const calculators = [
  { id: 'standard', name: 'Standard', icon: Calculator, component: StandardCalc },
  { id: 'scientific', name: 'Scientific', icon: FlaskConical, component: ScientificCalc },
  { id: 'financial', name: 'Financial', icon: DollarSign, component: FinancialCalc },
  { id: 'units', name: 'Units Converter', icon: Scale, component: UnitConverter },
  { id: 'bmi', name: 'BMI Calculator', icon: Activity, component: BMICalc },
  { id: 'base', name: 'Programmer (Base)', icon: Binary, component: BaseConverter },
  { id: 'electrical', name: 'Electrical', icon: Zap, component: ElectricalCalc },
];

export function QbitApp() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<CalcType>('standard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = calculators.find(c => c.id === activeTab)?.component || StandardCalc;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 border-r border-slate-800 
        transform transition-transform duration-300 ease-in-out flex flex-col
        md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-800">
          <div className="bg-indigo-500/10 p-2 rounded-lg">
            <Hexagon className="w-6 h-6 text-indigo-500" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">Qbit</span>
          <button 
            className="ml-auto md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
            Calculators
          </div>
          {calculators.map((calc) => (
            <button
              key={calc.id}
              onClick={() => {
                setActiveTab(calc.id as CalcType);
                setMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeTab === calc.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}
              `}
            >
              <calc.icon className={`w-5 h-5 ${activeTab === calc.id ? 'text-white' : 'text-slate-500'}`} />
              <span className="font-medium text-sm">{calc.name}</span>
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="md:hidden flex items-center p-4 border-b border-slate-800 bg-slate-900">
          <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-400 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 font-bold text-white">Qbit</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-slate-950">
          <div className="w-full max-w-4xl h-full flex flex-col">
            <div className="mb-6 hidden md:block">
              <h2 className="text-2xl font-bold text-white">
                {calculators.find(c => c.id === activeTab)?.name}
              </h2>
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              <ActiveComponent />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
