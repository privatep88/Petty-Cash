import React, { useState, useEffect } from 'react';
import { Banknote } from 'lucide-react';

export const Header: React.FC = () => {
  // Use state to hold the current date
  const [today, setToday] = useState(new Date());

  // Update date every minute to ensure it stays current if the page is left open
  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const displayMonth = today.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const displayYear = today.getFullYear();
  const displayDay = today.getDate().toString().padStart(2, '0');
  const weekday = today.toLocaleString('en-US', { weekday: 'long' });

  return (
    <>
      {/* Screen Header - Dark Navbar */}
      <div className="w-full bg-[#091526] text-white py-3 px-4 md:px-8 border-b-4 border-[#eab308] print:hidden font-sans">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo Section (Right in RTL) */}
          <div className="flex items-center gap-3">
             <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-[#2b6eff] to-[#1a4dbf] flex items-center justify-center shadow-lg overflow-hidden border border-blue-500/30">
                <span className="text-white font-bold text-4xl italic pr-0.5 z-10">S</span>
                <span className="absolute bottom-3 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full z-10"></span>
                {/* Gloss effect */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-white/20 blur-xl rounded-full"></div>
             </div>
             <div className="flex flex-col items-start leading-none justify-center">
                <h1 className="text-2xl font-bold tracking-widest text-white">SAHER</h1>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-[10px] tracking-widest text-gray-300 font-sans font-semibold">FOR SMART SERVICES</span>
                   <div className="w-5 h-0.5 bg-yellow-500 rounded-full"></div>
                </div>
             </div>
          </div>

          {/* Center Title Section */}
          <div className="flex flex-col items-center text-center gap-2 flex-1">
             <div className="bg-[#102038] border border-[#23385b] rounded px-6 py-1.5 shadow-sm">
                <span className="text-[#eab308] text-sm md:text-base font-medium">
                  إدارة الخدمات العامة / قسم إدارة المرافق
                </span>
             </div>
             <h2 className="text-white text-sm md:text-lg font-medium opacity-90 tracking-wide">
                نظام تسجيل المبالغ المصروفة من قبل الدعم اللوجيستي ( بيتي كاش )
             </h2>
          </div>

          {/* Date Display Widget - Shows Actual Current Date */}
          <div className="flex items-center">
             <div className="relative group overflow-hidden bg-[#0f172a] border border-[#1e293b] hover:border-[#2b6eff]/50 rounded-xl p-0.5 transition-all duration-300 shadow-lg">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2b6eff]/0 via-[#2b6eff]/10 to-[#2b6eff]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative flex items-center bg-[#091526] rounded-[10px] px-5 py-2 gap-4">
                    {/* Day Box */}
                    <div className="flex flex-col items-center justify-center">
                        <span className="text-[10px] text-[#eab308] font-bold uppercase tracking-widest mb-[-2px]">{displayMonth}</span>
                        <span className="text-3xl font-bold text-white font-sans tracking-tight">{displayDay}</span>
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-[#334155] to-transparent"></div>

                    {/* Year/Meta Box */}
                    <div className="flex flex-col justify-center">
                        <span className="text-[9px] text-gray-400 font-medium uppercase tracking-[0.2em]">{weekday}</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-xl font-bold text-white tracking-widest font-sans">{displayYear}</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#2b6eff] animate-pulse"></div>
                        </div>
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>

      {/* Secondary Header Strip - Full Width Version */}
      <div className="w-[95%] md:w-full max-w-[1050px] mx-auto bg-[#091526] border-x border-slate-600 border-b-4 border-b-[#eab308] rounded-xl shadow-lg print:hidden font-sans mt-10">
        <div className="px-6 md:px-8">
            <div className="flex items-center justify-center h-16">
                 <div className="relative h-full flex items-center px-1 gap-3">
                    <div className="bg-[#eab308]/10 p-2 rounded-lg border border-[#eab308]/20">
                        <Banknote className="text-[#eab308]" size={24} />
                    </div>
                    <span className="text-white font-medium text-lg md:text-xl cursor-default">المبالغ المصروفة من قبل الدعم اللوجيستي ( بيتي كاش )</span>
                 </div>
            </div>
        </div>
      </div>

      {/* Print Header - Simple White Version */}
      <div className="hidden print:block border-2 border-black bg-saaed-blue p-6 text-center mb-6">
        <h1 className="text-xl font-bold mb-4 text-black">
          إدارة الخدمات العامة / قسم إدارة المرافق
        </h1>
        <h2 className="text-lg font-semibold text-black">
          نظام تسجيل المبالغ المصروفة من قبل الدعم اللوجيستي ( بيتي كاش )
        </h2>
      </div>
    </>
  );
};