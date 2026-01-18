import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './components/Header';
import { ScreenFooter, PrintFooter } from './components/Footer';
import { ExpenseTable } from './components/ExpenseTable';
import { ExpenseEntry, PeriodData } from './types';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

const INITIAL_ROWS = 4;
const STORAGE_KEY = 'saher_petty_cash_data_v1';

const App: React.FC = () => {
  // State for Month/Year Selection
  const [month, setMonth] = useState<string>("يناير");
  const [year, setYear] = useState<string>("2026");

  // State to store data for all periods. Key format: "YYYY-MonthName"
  const [dataStore, setDataStore] = useState<Record<string, PeriodData>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // State for Delete Confirmation Modal
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Load from LocalStorage on Mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        setDataStore(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever dataStore changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataStore));
    }
  }, [dataStore, isLoaded]);

  // Helper to generate a unique key for the period
  const getCurrentKey = (y: string, m: string) => `${y}-${m}`;

  // Helper to generate default empty rows
  const generateDefaultRows = (): ExpenseEntry[] => {
    return Array.from({ length: INITIAL_ROWS }).map((_, idx) => ({
      id: uuidv4(),
      index: idx + 1,
      requestNumber: '',
      requestType: '',
      subject: '',
      executionDate: '',
      cost: '',
      notes: ''
    }));
  };

  // Get current active data or create default if not exists (Lazy initialization logic)
  const currentKey = getCurrentKey(year, month);
  const currentData = dataStore[currentKey] || {
    entries: generateDefaultRows(),
    generalNotes: ""
  };

  // Handlers need to update the specific period in the dataStore
  const updateStore = (updatedData: PeriodData) => {
    setDataStore(prev => ({
      ...prev,
      [currentKey]: updatedData
    }));
  };

  const handleUpdateEntry = (id: string, field: keyof ExpenseEntry, value: string | number) => {
    const updatedEntries = currentData.entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    );
    updateStore({ ...currentData, entries: updatedEntries });
  };

  const handleAddEntry = () => {
    const newEntry: ExpenseEntry = {
      id: uuidv4(),
      index: currentData.entries.length + 1,
      requestNumber: '',
      requestType: '',
      subject: '',
      executionDate: '',
      cost: '',
      notes: ''
    };
    updateStore({ ...currentData, entries: [...currentData.entries, newEntry] });
  };

  // Trigger modal instead of immediate delete
  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
  };

  // Actual delete logic called by modal
  const confirmDelete = () => {
    if (deleteId) {
        const filteredEntries = currentData.entries.filter(e => e.id !== deleteId);
        // Re-index
        const reIndexedEntries = filteredEntries.map((e, idx) => ({ ...e, index: idx + 1 }));
        updateStore({ ...currentData, entries: reIndexedEntries });
        setDeleteId(null);
    }
  };

  const handleUpdateGeneralNotes = (notes: string) => {
    updateStore({ ...currentData, generalNotes: notes });
  };

  // Calculate Grand Totals across all stored periods for the SELECTED YEAR
  const totals = Object.entries(dataStore).reduce<{cost: number, count: number}>((acc, [key, period]) => {
    // Extract year from key (format: "YYYY-MonthName")
    const keyYear = key.split('-')[0];
    
    // Only include data if it matches the currently selected year
    if (keyYear !== year) {
        return acc;
    }

    // Explicitly cast period to PeriodData to fix type inference issue
    const p = period as PeriodData;

    // Sum cost
    const periodCost = p.entries.reduce((sum, entry) => sum + (Number(entry.cost) || 0), 0);
    
    // Count active requests (rows that have either a request number, a cost, or a subject)
    // We filter out purely empty rows so the count is accurate
    const periodCount = p.entries.filter(e => 
      (e.requestNumber && e.requestNumber.trim() !== '') || 
      (e.cost !== '') || 
      (e.subject && e.subject.trim() !== '')
    ).length;

    return {
      cost: acc.cost + periodCost,
      count: acc.count + periodCount
    };
  }, { cost: 0, count: 0 });

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-100">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col print:bg-white print:block relative">
      
      {/* Header spanning full width - Independent Date Widget */}
      <Header />

      <div className="flex-1 w-full p-4 md:p-8 print:p-0">
        <div className="max-w-[1100px] mx-auto bg-white px-6 pt-6 pb-2 shadow-xl flex flex-col justify-between print:shadow-none print:w-full print:min-h-[29.7cm] print:p-0 print:m-0">
          
          {/* Paper Content */}
          <div className="flex flex-col flex-1">
             <ExpenseTable 
                entries={currentData.entries}
                month={month}
                year={year}
                grandTotal={totals.cost}
                totalRequests={totals.count}
                generalNotes={currentData.generalNotes}
                setGeneralNotes={handleUpdateGeneralNotes}
                setMonth={setMonth}
                setYear={setYear}
                onUpdateEntry={handleUpdateEntry}
                onAddEntry={handleAddEntry}
                onDeleteEntry={handleDeleteClick}
              />
          </div>

          {/* Footer for Print Only - Stays inside the paper container */}
          <PrintFooter />

        </div>
        
      </div>

      {/* Footer for Screen Only - Full width outside paper */}
      <ScreenFooter />

      {/* Custom Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 print:hidden animate-in fade-in duration-200" style={{ backdropFilter: 'blur(2px)' }}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full shadow-sm">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-red-900 font-sans">تأكيد عملية الحذف</h3>
              <button 
                onClick={() => setDeleteId(null)}
                className="mr-auto text-gray-400 hover:text-gray-600 hover:bg-red-100/50 rounded-full p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 text-center md:text-right">
              <p className="text-gray-800 font-bold text-lg leading-relaxed mb-2">
                هل أنت متأكد من رغبتك في حذف هذا الصف؟
              </p>
              <p className="text-gray-500 text-sm">
                سيتم إزالة البيانات المدخلة في هذا الصف نهائياً ولن تتمكن من استعادتها.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-bold transition-all shadow-sm active:scale-95"
              >
                إلغاء الأمر
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <Trash2 size={18} />
                نعم، احذف الصف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;