import React, { useState } from 'react';
import { ExpenseEntry, MONTHS_AR } from '../types';
import {
  Trash2,
  Plus,
  Printer,
  Calendar,
  ChevronDown,
  FileSpreadsheet,
  X,
  NotebookPen,
  Save,
  Check,
} from 'lucide-react';

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

const REQUEST_TYPE_SUGGESTIONS = [
  'مشتريات عاجلة',
  'صيانة عامة',
  'ضيافة ومستلزمات',
  'نقل وتوصيل',
  'قرطاسية ومطبوعات',
  'أخرى',
];

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
  onDeleteEntry,
}) => {
  const [justSaved, setJustSaved] = useState(false);
  const totalCost = entries.reduce((sum, entry) => sum + (Number(entry.cost) || 0), 0);

  // Generate years from 2024 to 2050
  const startYear = 2024;
  const endYear = 2050;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) =>
    (startYear + i).toString()
  );

  const handleSave = () => {
    // The save is already automatic via state changes. This is purely for user feedback.
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
    }, 2000);
  };

  const handleExportExcel = () => {
    // CSV Header
    const headers = [
      'م',
      'رقم الطلب',
      'نوع الطلب',
      'الموضوع',
      'تاريخ التنفيذ',
      'التكلفة',
      'الملاحظات',
    ];

    // Helper to sanitize CSV fields (handle newlines and quotes)
    const sanitize = (val: string | number) => {
      const stringVal = (val || '').toString();
      return `"${stringVal.replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    };

    // CSV Rows
    const rows = entries.map((entry) => [
      entry.index,
      sanitize(entry.requestNumber),
      sanitize(entry.requestType),
      sanitize(entry.subject),
      sanitize(entry.executionDate),
      entry.cost,
      sanitize(entry.notes),
    ]);

    // Combine
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    // Create Blob with BOM for Arabic characters support in Excel
    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    // Create download link
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `تقرير_مصروفات_${month}_${year}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionButtonClass =
    'flex items-center justify-center gap-2.5 bg-gradient-to-b from-[#153156] to-[#081931] hover:from-[#1b3d69] hover:to-[#0c2342] text-white font-bold px-5 py-3 rounded-xl shadow-md border border-[#2a4d7a]/80 transition-all hover:shadow-lg active:scale-95 w-full sm:w-auto text-sm md:text-[15px] cursor-pointer whitespace-nowrap';

  return (
    <div className="w-full">
      {/* Top Controls Section: Period Selector (Right in RTL) and Action Buttons (Left in RTL) */}
      <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center mb-4 gap-4">
        {/* Financial Period Selector Box (Right Side in RTL) */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#06162d] via-[#0b2242] to-[#081a34] shadow-md border border-[#1d395e] px-5 py-2.5 print:hidden shrink-0">
          {/* Subtle Gold Corner Accents matching Reference */}
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#facc15] via-[#eab308] to-[#b4820c]" />
          <svg
            className="absolute left-0 bottom-0 w-10 h-10 pointer-events-none opacity-85"
            viewBox="0 0 40 40"
            preserveAspectRatio="none"
          >
            <polygon points="0,40 0,14 26,40" fill="#d4a017" />
            <polygon points="0,40 0,24 16,40" fill="#091d38" />
          </svg>

          <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-end justify-center sm:justify-start gap-3 md:gap-4">
            {/* Month Selector Column */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-gray-300 font-semibold mb-1">الشهر</span>
              <div className="relative flex items-center bg-[#061529] border border-[#d4a017] rounded-lg px-3 py-1.5 min-w-[160px] md:min-w-[180px] hover:border-[#facc15] transition-colors">
                <Calendar size={17} className="text-[#eab308] shrink-0 ml-2 pointer-events-none" />
                <select
                  aria-label="الشهر"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="appearance-none bg-transparent text-white font-extrabold text-base md:text-lg cursor-pointer focus:outline-none w-full text-center pl-5"
                >
                  {MONTHS_AR.map((m) => (
                    <option key={m} value={m} className="text-black bg-white font-bold">
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                />
              </div>
            </div>

            <span className="text-gray-500 font-light text-xl pb-1.5 hidden sm:inline">/</span>

            {/* Year Selector Column */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] text-gray-300 font-semibold mb-1">السنة</span>
              <div className="relative flex items-center bg-[#061529] border border-[#3b6291] rounded-lg px-3 py-1.5 min-w-[130px] md:min-w-[140px] hover:border-[#eab308] transition-colors">
                <Calendar size={17} className="text-[#eab308] shrink-0 ml-2 pointer-events-none" />
                <select
                  aria-label="السنة"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="appearance-none bg-transparent text-white font-extrabold text-base md:text-lg font-sans tabular-nums cursor-pointer focus:outline-none w-full text-center pl-5"
                >
                  {years.map((y) => (
                    <option key={y} value={y} className="text-black bg-white font-bold">
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date Selection Box - Simple for Print */}
        <div className="hidden print:flex border-2 border-black bg-saaed-blue px-8 py-2 min-w-[320px] text-center font-bold text-lg items-center justify-center gap-2 w-full md:w-auto">
          <span>شهر</span>
          <span>{month}</span>
          <span>/</span>
          <span>{year}</span>
        </div>

        {/* Action Buttons Group (Left Side in RTL) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-end gap-3 no-print">
          <button
            onClick={handleSave}
            disabled={justSaved}
            className={
              justSaved
                ? 'flex items-center justify-center gap-2.5 bg-green-600 text-white font-bold px-5 py-3 rounded-xl shadow-md w-full sm:w-auto text-sm md:text-[15px] cursor-not-allowed whitespace-nowrap'
                : actionButtonClass
            }
          >
            {justSaved ? (
              <>
                <Check size={19} />
                <span>تم الحفظ!</span>
              </>
            ) : (
              <>
                <Save size={19} className="text-[#f5c230] shrink-0" />
                <span>حفظ التغييرات</span>
              </>
            )}
          </button>

          <button onClick={onAddEntry} className={actionButtonClass}>
            <Plus size={19} className="text-[#f5c230] shrink-0" strokeWidth={2.5} />
            <span>إضافة صف جديد</span>
          </button>

          <button onClick={handleExportExcel} className={actionButtonClass}>
            <FileSpreadsheet size={19} className="text-[#f5c230] shrink-0" />
            <span>تصدير إلى Excel</span>
          </button>

          <button onClick={() => window.print()} className={actionButtonClass}>
            <Printer size={19} className="text-[#f5c230] shrink-0" />
            <span>طباعة النموذج</span>
          </button>
        </div>
      </div>

      {/* Golden Notes Bar (شريط الملاحظات) */}
      <div className="w-full rounded-xl border border-[#e3c15a] bg-gradient-to-l from-[#f5d87c] via-[#f9eab8] to-[#f4dc8c] p-2 mb-4 flex items-center gap-3 shadow-xs print:rounded-none print:border-2 print:border-black print:bg-white print:p-0 print:h-14">
        {/* Right Label Pill */}
        <div className="bg-gradient-to-b from-[#f5cf56] to-[#e5b528] border border-[#c99712] rounded-lg px-5 py-2 flex items-center justify-center gap-2 shrink-0 shadow-2xs print:bg-[#091526] print:text-white print:rounded-none print:border-0 print:border-l-2 print:border-black print:h-full print:w-[15%] print:min-w-[120px]">
          <NotebookPen size={19} className="text-[#091526] print:text-[#eab308]" />
          <span className="font-extrabold text-[#091526] text-sm md:text-base print:text-white">
            الملاحظات
          </span>
        </div>

        {/* Long Input Field */}
        <div className="flex-1 bg-[#fdfbf3] border border-[#dfc672] rounded-lg h-10 flex items-center print:bg-white print:border-0 print:h-full">
          <input
            type="text"
            className="w-full h-full px-4 text-right bg-transparent focus:outline-none placeholder-gray-400 text-[#091526] font-bold text-sm md:text-base print:text-black print:placeholder-transparent"
            value={generalNotes}
            onChange={(e) => setGeneralNotes(e.target.value)}
            placeholder="اكتب ملاحظاتك هنا ..."
          />
        </div>

        {/* Left Decorative Notepad & Pen Illustration (matches reference image) */}
        <div className="hidden sm:flex items-center justify-center pl-2 pr-1 shrink-0 print:hidden">
          <svg
            width="42"
            height="38"
            viewBox="0 0 48 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Spiral Notepad */}
            <rect
              x="6"
              y="5"
              width="28"
              height="35"
              rx="3"
              fill="#fffdf5"
              stroke="#0c2240"
              strokeWidth="2.2"
            />
            {/* Spiral rings on top */}
            <line x1="11" y1="2" x2="11" y2="8" stroke="#0c2240" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="17" y1="2" x2="17" y2="8" stroke="#0c2240" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="23" y1="2" x2="23" y2="8" stroke="#0c2240" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="29" y1="2" x2="29" y2="8" stroke="#0c2240" strokeWidth="2.2" strokeLinecap="round" />
            {/* Notepad lines */}
            <line x1="11" y1="14" x2="28" y2="14" stroke="#eab308" strokeWidth="2" strokeLinecap="round" />
            <line x1="11" y1="20" x2="26" y2="20" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="11" y1="26" x2="24" y2="26" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="11" y1="32" x2="21" y2="32" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />
            {/* Pen */}
            <path
              d="M39 11L43 15L26 32L20 34L22 28L39 11Z"
              fill="#0c2240"
              stroke="#0c2240"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path d="M36 14L40 18" stroke="#eab308" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Main Expense Table */}
      <div className="overflow-x-auto rounded-xl border border-[#b8c7d9] shadow-sm bg-white print:rounded-none print:border-2 print:border-black print:shadow-none">
        <table className="w-full min-w-[820px] border-collapse text-center text-sm md:text-[15px] table-fixed">
          <thead>
            <tr className="bg-gradient-to-b from-[#112b4e] to-[#081930] text-white font-bold h-12 print:bg-[#334155]">
              <th className="border-l border-[#234168] p-2.5 w-[4.5%] align-middle print:border-2 print:border-black">
                م
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[11.5%] align-middle print:border-2 print:border-black">
                رقم الطلب
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[13.5%] align-middle print:border-2 print:border-black">
                نوع الطلب
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[26.5%] align-middle print:border-2 print:border-black">
                الموضوع
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[15%] align-middle print:border-2 print:border-black">
                تاريخ التنفيذ
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[11%] align-middle print:border-2 print:border-black">
                التكلفة (AED)
              </th>
              <th className="border-l border-[#234168] p-2.5 w-[14%] align-middle print:border-2 print:border-black">
                الملاحظات
              </th>
              <th className="p-2 w-[4%] align-middle no-print">
                <div className="flex items-center justify-center">
                  <X size={18} className="text-gray-200" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry, idx) => (
              <tr
                key={entry.id}
                className="bg-[#eef3f8] even:bg-[#e7eef6] hover:bg-[#dfe8f3] transition-colors border-b border-[#cbd5e1] h-[52px] break-inside-avoid print:bg-white print:h-14"
              >
                {/* 1. Index */}
                <td className="font-bold bg-[#0c213d] text-white font-sans tabular-nums text-base border-l border-[#1f3b61] align-middle print:text-black print:bg-transparent print:border-2 print:border-black">
                  {idx + 1}
                </td>

                {/* 2. Request Number */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <input
                    type="text"
                    value={entry.requestNumber}
                    onChange={(e) => onUpdateEntry(entry.id, 'requestNumber', e.target.value)}
                    className="w-full h-9 px-2.5 text-center bg-white border border-[#c5d1e0] rounded-md font-semibold text-gray-800 focus:bg-white focus:border-[#2b6eff] focus:ring-1 focus:ring-[#2b6eff] focus:outline-none transition-colors shadow-2xs"
                  />
                </td>

                {/* 3. Request Type */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <div className="relative flex items-center w-full h-9">
                    <input
                      type="text"
                      list={`request-types-${entry.id}`}
                      value={entry.requestType}
                      onChange={(e) => onUpdateEntry(entry.id, 'requestType', e.target.value)}
                      className="w-full h-full px-2.5 pl-6 text-center bg-white border border-[#c5d1e0] rounded-md font-medium text-gray-800 focus:bg-white focus:border-[#2b6eff] focus:ring-1 focus:ring-[#2b6eff] focus:outline-none transition-colors shadow-2xs"
                    />
                    <ChevronDown
                      size={14}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none print:hidden"
                    />
                    <datalist id={`request-types-${entry.id}`}>
                      {REQUEST_TYPE_SUGGESTIONS.map((item) => (
                        <option key={item} value={item} />
                      ))}
                    </datalist>
                  </div>
                </td>

                {/* 4. Subject */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <input
                    type="text"
                    value={entry.subject}
                    onChange={(e) => onUpdateEntry(entry.id, 'subject', e.target.value)}
                    className="w-full h-9 px-3 text-center bg-white border border-[#c5d1e0] rounded-md font-medium text-gray-800 focus:bg-white focus:border-[#2b6eff] focus:ring-1 focus:ring-[#2b6eff] focus:outline-none transition-colors shadow-2xs"
                  />
                </td>

                {/* 5. Execution Date */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <div className="relative flex items-center w-full h-9 bg-white border border-[#c5d1e0] rounded-md shadow-2xs focus-within:border-[#2b6eff] focus-within:ring-1 focus-within:ring-[#2b6eff]">
                    {!entry.executionDate && (
                      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none print:hidden">
                        <Calendar size={15} className="text-[#0c213d] shrink-0" />
                        <span className="text-xs text-gray-500 font-medium mx-auto">
                          يوم / شهر / سنة
                        </span>
                      </div>
                    )}
                    <input
                      type="date"
                      value={entry.executionDate}
                      onChange={(e) => onUpdateEntry(entry.id, 'executionDate', e.target.value)}
                      className={`w-full h-full px-2 text-center bg-transparent font-sans text-sm font-semibold focus:outline-none ${
                        entry.executionDate ? 'text-gray-800' : 'text-transparent focus:text-gray-800'
                      }`}
                    />
                  </div>
                </td>

                {/* 6. Cost (AED) */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={entry.cost}
                    onChange={(e) =>
                      onUpdateEntry(
                        entry.id,
                        'cost',
                        e.target.value === '' ? '' : parseFloat(e.target.value)
                      )
                    }
                    className="w-full h-9 px-2.5 text-center bg-white border border-[#c5d1e0] rounded-md font-sans font-extrabold tabular-nums text-gray-900 placeholder-gray-800 focus:placeholder-gray-300 focus:bg-white focus:border-[#2b6eff] focus:ring-1 focus:ring-[#2b6eff] focus:outline-none transition-colors shadow-2xs print:placeholder-transparent"
                  />
                </td>

                {/* 7. Notes */}
                <td className="p-1.5 border-l border-[#cbd5e1] align-middle print:border-2 print:border-black print:p-0">
                  <input
                    type="text"
                    value={entry.notes}
                    onChange={(e) => onUpdateEntry(entry.id, 'notes', e.target.value)}
                    className="w-full h-9 px-2.5 text-center bg-white border border-[#c5d1e0] rounded-md font-medium text-gray-800 focus:bg-white focus:border-[#2b6eff] focus:ring-1 focus:ring-[#2b6eff] focus:outline-none transition-colors shadow-2xs"
                  />
                </td>

                {/* 8. Delete Action */}
                <td className="p-1 text-center no-print align-middle bg-[#e4ebf3]">
                  <button
                    onClick={() => onDeleteEntry(entry.id)}
                    className="text-[#dc2626] hover:text-red-700 hover:bg-red-100/70 rounded-md transition-colors p-1.5 cursor-pointer"
                    title="حذف الصف"
                  >
                    <Trash2 size={18} strokeWidth={2.2} />
                  </button>
                </td>
              </tr>
            ))}

            {/* Monthly Total Row */}
            <tr className="font-bold h-12 break-inside-avoid">
              <td
                colSpan={5}
                className="bg-gradient-to-b from-[#0e2646] to-[#07172d] text-white p-2 align-middle border-l border-[#234168] print:bg-transparent print:text-black print:border-2 print:border-black"
              >
                <div className="flex items-center justify-center gap-3">
                  {/* Gold Stacked Cylinder Coins SVG */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="text-[#f5c230] print:text-black shrink-0"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="18" cy="7" rx="6" ry="2.5" />
                    <path d="M12 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7" />
                    <path d="M12 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
                    <path d="M12 15v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" />
                    <ellipse cx="9.5" cy="14.5" rx="5.5" ry="2.3" />
                    <path d="M4 14.5v3.5c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3v-3.5" />
                    <path d="M4 18v3.5c0 1.3 2.5 2.3 5.5 2.3s5.5-1 5.5-2.3V18" />
                  </svg>
                  <span className="text-[#f5c230] font-sans text-lg font-extrabold print:text-black">
                    &Sigma;
                  </span>
                  <span className="text-base md:text-lg font-extrabold tracking-wide">
                    المجموع (هذا الشهر)
                  </span>
                </div>
              </td>

              <td className="bg-[#e8f0fe] p-2 align-middle font-sans font-extrabold text-base md:text-lg text-[#1d4ed8] tabular-nums border-l border-[#cbd5e1] print:bg-transparent print:text-black print:border-2 print:border-black whitespace-nowrap">
                <span dir="ltr">
                  {totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} AED
                </span>
              </td>

              <td
                colSpan={2}
                className="bg-gradient-to-b from-[#0e2646] to-[#07172d] p-2 align-middle print:bg-transparent print:border-2 print:border-black"
              />
            </tr>
          </tbody>
        </table>
      </div>

      {/* Cumulative Financial Indicator Cards (بطاقات المؤشرات المالية) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 mb-2 break-inside-avoid">
        {/* Card 1 (Right in RTL): Cumulative Requests Count */}
        <div className="rounded-2xl bg-gradient-to-l from-[#dcf5ea] via-[#eafaf3] to-[#f4fcf9] border border-[#b6e3cf] shadow-sm p-3.5 flex items-center justify-between gap-4 print:border-2 print:border-black print:rounded-none print:bg-white">
          <div className="flex items-center gap-4">
            {/* Green Icon Badge */}
            <div className="w-18 h-16 md:w-20 md:h-[68px] rounded-xl bg-gradient-to-b from-[#17824b] to-[#0b5830] flex items-center justify-center shadow-md shrink-0 print:hidden">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="5" y="3" width="14" height="18" rx="2" />
                <path d="M9 3h6v3H9z" />
                <path d="M9 10l1.5 1.5L13 9" />
                <line x1="15" y1="10" x2="16" y2="10" />
                <path d="M9 15l1.5 1.5L13 14" />
                <line x1="15" y1="15" x2="16" y2="15" />
              </svg>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-lg md:text-[21px] font-extrabold text-[#091526] leading-snug">
                إجمالي عدد الطلبات التراكمي
              </span>
              <span className="text-xs md:text-sm text-gray-600 font-semibold mt-0.5 print:hidden">
                عدد الطلبات المسجلة لكافة الأشهر
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-2 pl-2 shrink-0">
            <span className="text-3xl md:text-[38px] font-extrabold text-[#15803d] font-sans tabular-nums tracking-tight print:text-black">
              {totalRequests}
            </span>
            <span className="text-sm md:text-base font-bold text-[#1e293b] print:hidden">
              طلب
            </span>
          </div>
        </div>

        {/* Card 2 (Left in RTL): Cumulative Grand Total Cost */}
        <div className="rounded-2xl bg-gradient-to-l from-[#dfecfb] via-[#edf4fd] to-[#f6f9ff] border border-[#bfd7f6] shadow-sm p-3.5 flex items-center justify-between gap-4 print:border-2 print:border-black print:rounded-none print:bg-white">
          <div className="flex items-center gap-4">
            {/* Royal Blue Icon Badge with 3D Stacked Coins SVG */}
            <div className="w-18 h-16 md:w-20 md:h-[68px] rounded-xl bg-gradient-to-b from-[#1150a4] to-[#082d63] flex items-center justify-center shadow-md shrink-0 print:hidden">
              <svg
                width="38"
                height="38"
                viewBox="0 0 32 32"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="20.5" cy="8.5" rx="6.5" ry="2.8" />
                <path d="M14 8.5v4.2c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8V8.5" />
                <path d="M14 12.7v4.2c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-4.2" />
                <path d="M14 16.9v4.2c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8v-4.2" />
                <ellipse cx="11" cy="17.5" rx="6" ry="2.6" />
                <path d="M5 17.5v3.8c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-3.8" />
                <path d="M5 21.3v3.8c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-3.8" />
              </svg>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-lg md:text-[21px] font-extrabold text-[#091526] leading-snug">
                إجمالي المصروفات التراكمي
              </span>
              <span className="text-xs md:text-sm text-gray-600 font-semibold mt-0.5 print:hidden">
                المبلغ الإجمالي لكافة الطلبات على مدار السنة والأشهر
              </span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5 pl-2 shrink-0" dir="ltr">
            <span className="text-sm md:text-base font-extrabold text-[#0c3c88] print:hidden">
              AED
            </span>
            <span className="text-3xl md:text-[38px] font-extrabold text-[#0c3c88] font-sans tabular-nums tracking-tight print:text-black">
              {grandTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};