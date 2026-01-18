import React from 'react';
import { ExpenseEntry, MONTHS_AR } from '../types';
import { Trash2, Plus, Printer, Calculator, FileStack, Calendar, ChevronDown, FileSpreadsheet, X, Sigma, NotebookPen } from 'lucide-react';

interface ExpenseTableProps {
  entries: ExpenseEntry[];
  month: string;
  year: string;
  grandTotal: number;
  totalRequests: number;
  generalNotes: string;
  setGeneralNotes: (notes: string) => void;
  setMonth: (m: string) => void;
  setYear: (y: string) => void;
  onUpdateEntry: (id: string, field: keyof ExpenseEntry, value: string | number) => void;
  onAddEntry: () => void;
  onDeleteEntry: (id: string) => void;
}

export const ExpenseTable: React.FC<ExpenseTableProps> = ({
  entries,
  month,
  year,
  grandTotal,
  totalRequests,
  generalNotes,
  setGeneralNotes,
  setMonth,
  setYear,
  onUpdateEntry,
  onAddEntry,
  onDeleteEntry
}) => {
  
  const totalCost = entries.reduce((sum, entry) => sum + (Number(entry.cost) || 0), 0);

  // Generate years from 2026 to 2050
  const startYear = 2026;
  const endYear = 2050;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => (startYear + i).toString());

  // Common classes for header cells
  const headerClass = "border-2 border-black p-3 align-middle text-center font-bold text-sm md:text-base bg-[#334155] text-white";
  
  // Common classes for input/textarea cells
  const cellClass = "border-2 border-black p-0 align-middle h-16 relative"; 
  
  // Input/Textarea styling
  const inputBaseClass = "w-full h-full p-2 text-center bg-transparent focus:bg-blue-50 focus:outline-none transition-colors placeholder-gray-400 print:placeholder-transparent";
  const textareaClass = `${inputBaseClass} resize-none leading-relaxed flex items-center justify-center pt-4`;

  const handleExportExcel = () => {
    // CSV Header
    const headers = [
      "م",
      "رقم الطلب",
      "نوع الطلب",
      "الموضوع",
      "تاريخ التنفيذ",
      "التكلفة",
      "الملاحظات"
    ];

    // Helper to sanitize CSV fields (handle newlines and quotes)
    const sanitize = (val: string | number) => {
        const stringVal = (val || '').toString();
        // Replace quotes with double quotes, and replace newlines with space to prevent broken rows
        return `"${stringVal.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    };

    // CSV Rows
    const rows = entries.map(entry => [
      entry.index,
      sanitize(entry.requestNumber),
      sanitize(entry.requestType),
      sanitize(entry.subject),
      sanitize(entry.executionDate),
      entry.cost,
      sanitize(entry.notes)
    ]);

    // Combine
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // Create Blob with BOM for Arabic characters support in Excel
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `تقرير_مصروفات_${month}_${year}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full">
      {/* Top Controls Section: Buttons and Date Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        
        {/* Date Selection Box - Stylized for Screen */}
        <div className="relative group overflow-hidden rounded-xl bg-[#091526] shadow-xl min-w-[340px] w-full md:w-auto transform transition-all border border-slate-800 print:hidden hover:border-[#eab308]/30">
            {/* Gold Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#eab308]"></div>
            
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2b6eff]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-4">
                    {/* Icon Box */}
                    <div className="bg-white/5 p-2.5 rounded-lg text-[#eab308] border border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Calendar size={24} strokeWidth={1.5} />
                    </div>

                    {/* Text & Selectors */}
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-medium tracking-widest uppercase mb-0.5">الفترة المالية</span>
                        <div className="flex items-center gap-1.5 font-sans">
                             
                             {/* Month Select */}
                             <div className="relative group/month">
                                <select 
                                   value={month} 
                                   onChange={(e) => setMonth(e.target.value)}
                                   className="appearance-none bg-transparent text-white font-bold text-xl cursor-pointer focus:outline-none pr-5 pl-1 hover:text-[#eab308] transition-colors"
                                >
                                   {MONTHS_AR.map(m => <option key={m} value={m} className="text-black">{m}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover/month:text-[#eab308] transition-colors" />
                             </div>

                             <span className="text-gray-600 font-light text-xl mx-1">/</span>

                             {/* Year Select */}
                             <div className="relative group/year">
                                <select 
                                   value={year}
                                   onChange={(e) => setYear(e.target.value)}
                                   className="appearance-none bg-transparent text-[#eab308] font-bold text-xl cursor-pointer focus:outline-none pr-5 pl-1 hover:text-white transition-colors"
                                >
                                   {years.map(y => <option key={y} value={y} className="text-black">{y}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover/year:text-white transition-colors" />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Date Selection Box - Simple for Print (Matches Form Identity) */}
        <div className="hidden print:flex border-2 border-black bg-saaed-blue px-8 py-2 min-w-[320px] text-center font-bold text-lg items-center justify-center gap-2 w-full md:w-auto">
           <span>شهر</span>
           <span>{month}</span>
           <span>/</span>
           <span>{year}</span>
        </div>

        {/* Buttons - Left Side (Second in DOM for RTL) */}
        <div className="flex gap-4 no-print w-full md:w-auto">
          <button
            onClick={onAddEntry}
            className="flex items-center justify-center gap-2 bg-[#334155] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#1e293b] transition-all hover:shadow-lg active:scale-95 w-full md:w-auto"
          >
            <Plus size={20} className="text-[#eab308]" />
            إضافة صف جديد
          </button>
          
          <button
            onClick={handleExportExcel}
            className="flex items-center justify-center gap-2 bg-[#334155] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#1e293b] transition-all hover:shadow-lg active:scale-95 w-full md:w-auto"
          >
            <FileSpreadsheet size={20} className="text-[#eab308]" />
            تصدير إلى Excel
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-[#334155] text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-[#1e293b] transition-all hover:shadow-lg active:scale-95 w-full md:w-auto"
          >
            <Printer size={20} className="text-[#eab308]" />
            طباعة النموذج
          </button>
        </div>

      </div>

      {/* Special Notes Row */}
      <div className="flex w-full border-2 border-black mb-4 h-14">
        <div className="w-[15%] min-w-[120px] bg-[#091526] text-white border-l-2 border-black font-bold text-center flex items-center justify-center text-sm md:text-base relative print:bg-[#091526] print:text-white">
          <div className="absolute inset-1 border border-[#eab308]"></div>
          <div className="relative z-10 flex items-center gap-2">
             <NotebookPen size={18} className="text-[#eab308]" />
             <span>الملاحظات</span>
          </div>
        </div>
        <div className="flex-1 bg-[#eab308] print:bg-white print:text-black">
          <input 
            type="text"
            className="w-full h-full p-2 px-4 text-right bg-transparent focus:outline-none placeholder-[#091526]/50 text-[#091526] font-bold print:text-black print:placeholder-transparent"
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك هنا..."
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-black text-center text-sm md:text-base table-fixed">
          <thead>
            <tr>
              <th className={`${headerClass} w-[5%]`}>م</th>
              <th className={`${headerClass} w-[10%]`}>رقم الطلب</th>
              <th className={`${headerClass} w-[15%]`}>نوع الطلب</th>
              <th className={`${headerClass} w-[30%]`}>الموضوع</th>
              <th className={`${headerClass} w-[12%]`}>تاريخ ( التنفيذ )</th>
              <th className={`${headerClass} w-[10%]`}>التكلفة</th>
              <th className={`${headerClass} w-[18%]`}>الملاحظات</th>
              <th className="border-2 border-black p-2 w-[50px] no-print bg-[#334155] border-l-0 border-t-0 border-b-0">
                <div className="flex items-center justify-center">
                    <X size={20} className="text-white" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={entry.id} className="hover:bg-gray-50 group break-inside-avoid">
                {/* Index */}
                <td className={`${cellClass} font-bold bg-[#334155] text-white print:text-black print:bg-transparent`}>{idx + 1}</td>
                
                {/* Request Number */}
                <td className={cellClass}>
                  <input
                    type="text"
                    className={inputBaseClass}
                    value={entry.requestNumber}
                    onChange={(e) => onUpdateEntry(entry.id, 'requestNumber', e.target.value)}
                  />
                </td>
                
                {/* Request Type */}
                <td className={cellClass}>
                   <textarea
                    className={textareaClass}
                    value={entry.requestType}
                    onChange={(e) => onUpdateEntry(entry.id, 'requestType', e.target.value)}
                    style={{ overflow: 'hidden' }}
                  />
                </td>
                
                {/* Subject */}
                <td className={cellClass}>
                   <textarea
                    className={textareaClass}
                    value={entry.subject}
                    onChange={(e) => onUpdateEntry(entry.id, 'subject', e.target.value)}
                    style={{ overflow: 'hidden' }}
                  />
                </td>
                
                {/* Execution Date */}
                <td className={cellClass}>
                   <input
                    type="date"
                    className={`${inputBaseClass} font-sans`}
                    value={entry.executionDate}
                    onChange={(e) => onUpdateEntry(entry.id, 'executionDate', e.target.value)}
                  />
                </td>
                
                {/* Cost */}
                <td className={cellClass}>
                   <input
                    type="number"
                    min="0"
                    step="0.01"
                    className={`${inputBaseClass} font-sans font-bold`}
                    value={entry.cost}
                    onChange={(e) => onUpdateEntry(entry.id, 'cost', e.target.value === '' ? '' : parseFloat(e.target.value))}
                  />
                </td>
                
                {/* Notes */}
                <td className={cellClass}>
                   <textarea
                    className={textareaClass}
                    value={entry.notes}
                    onChange={(e) => onUpdateEntry(entry.id, 'notes', e.target.value)}
                    style={{ overflow: 'hidden' }}
                  />
                </td>
                
                {/* Actions */}
                <td className="border-0 p-1 text-center no-print align-middle bg-[#334155]">
                  <button 
                    onClick={() => onDeleteEntry(entry.id)}
                    className="text-white hover:text-red-400 transition-colors p-2"
                    title="حذف الصف"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {/* Monthly Total Row */}
            <tr className="bg-gray-100 font-bold h-12 break-inside-avoid">
               <td className="border-2 border-black p-2 align-middle bg-[#334155] text-white print:bg-transparent print:text-black" colSpan={5}>
                  <div className="flex items-center justify-center gap-2">
                      <Sigma size={20} className="text-[#eab308] print:text-black" />
                      <span>المجموع (لهذا الشهر)</span>
                  </div>
               </td>
               <td className="border-2 border-black p-2 align-middle font-sans text-lg text-blue-800 print:text-black">{totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
               <td className="border-2 border-black p-2 bg-[#334155] align-middle print:bg-transparent"></td>
               <td className="border-0 p-2 no-print bg-[#334155]"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 
        ========================================================================================
        TOTAL REQUESTS COUNT SECTION
        ========================================================================================
      */}
      <div className="mt-8 border-2 border-black bg-white shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden break-inside-avoid">
        {/* Decorative background accent - Teal/Green for Count */}
        <div className="absolute top-0 right-0 w-2 h-full bg-[#10b981] print:hidden"></div>
        
        <div className="flex items-center gap-3 pr-4 z-10">
          <div className="p-2 bg-gray-100 rounded-full border border-gray-300 print:hidden">
            <FileStack className="text-[#091526]" size={24} />
          </div>
          <div className="flex flex-col">
             <span className="text-lg md:text-xl font-bold text-[#091526]">إجمالي عدد الطلبات التراكمي</span>
             <span className="text-xs text-gray-500 font-medium print:hidden">عدد الطلبات المسجلة لكافة الأشهر</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-2 z-10">
             <span className="text-3xl md:text-4xl font-bold text-[#10b981] font-sans tracking-tight print:text-black">
               {totalRequests}
             </span>
             <span className="text-sm font-bold text-gray-400 mt-3 print:hidden">طلب</span>
        </div>
      </div>

      {/* 
        ========================================================================================
        GRAND TOTAL COST SECTION
        ========================================================================================
      */}
      <div className="mt-4 mb-4 border-2 border-black bg-white shadow-sm p-4 flex flex-col md:flex-row justify-between items-center gap-4 relative overflow-hidden break-inside-avoid">
        {/* Decorative background accent - Yellow for Money */}
        <div className="absolute top-0 right-0 w-2 h-full bg-[#eab308] print:hidden"></div>
        
        <div className="flex items-center gap-3 pr-4 z-10">
          <div className="p-2 bg-gray-100 rounded-full border border-gray-300 print:hidden">
            <Calculator className="text-[#091526]" size={24} />
          </div>
          <div className="flex flex-col">
             <span className="text-lg md:text-xl font-bold text-[#091526]">إجمالي المصروفات التراكمي</span>
             <span className="text-xs text-gray-500 font-medium print:hidden">المبلغ الإجمالي لكافة الطلبات على مدار السنة والأشهر</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pl-2 z-10">
             <span className="text-3xl md:text-4xl font-bold text-[#2b6eff] font-sans tracking-tight print:text-black">
               {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
             </span>
             <span className="text-sm font-bold text-gray-400 mt-3 print:hidden">AED</span>
        </div>
      </div>

      {/* Secondary Header Strip */}
      <div className="w-full bg-[#091526] border-x border-slate-600 border-b-4 border-b-[#eab308] rounded-xl shadow-lg print:hidden font-sans mt-12">
        <div className="px-6 md:px-8">
            <div className="flex items-center justify-center h-16">
                 <div className="relative h-full flex items-center px-1">
                    <span className="text-white font-medium text-lg md:text-xl cursor-default">شركة ساهر للخدمات الذكية</span>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};