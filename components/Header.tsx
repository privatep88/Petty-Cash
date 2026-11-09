import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { MONTHS_AR } from '../types';

const WEEKDAYS_AR = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت',
];

export const Header: React.FC = () => {
  // Use state to hold the current date
  const [today, setToday] = useState(new Date());

  // Update date every minute to ensure it stays current if the page is left open
  useEffect(() => {
    const timer = setInterval(() => setToday(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const displayYear = today.getFullYear();
  const displayDay = today.getDate().toString().padStart(2, '0');
  const displayMonthAr = MONTHS_AR[today.getMonth()];
  const weekdayAr = WEEKDAYS_AR[today.getDay()];

  return (
    <>
      {/* Screen Header - Full-Width Edge-to-Edge Corporate Navy Navbar */}
      <header className="w-full max-w-none bg-gradient-to-r from-[#041326] via-[#0c264a] to-[#05152b] text-white py-2.5 px-4 sm:px-6 lg:px-10 border-b-2 border-[#e5b82a] print:hidden font-sans relative overflow-hidden shadow-md">
        {/* Subtle geometric facet accent on left side matching reference */}
        <svg
          className="absolute left-[18%] top-0 h-full w-48 pointer-events-none opacity-35 hidden lg:block"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <polygon points="40,100 110,15 170,100" fill="#13325c" />
          <polyline
            points="40,100 110,15 170,100"
            fill="none"
            stroke="#d4a017"
            strokeWidth="1.2"
          />
          <line x1="110" y1="15" x2="125" y2="100" stroke="#264b7d" strokeWidth="1" />
        </svg>

        <div className="w-full max-w-none flex flex-col lg:flex-row items-center justify-between gap-3 relative z-10">
          {/* Right Section (RTL Start): SAHER Logo & Brand Name */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* Original SAHER Logo Box */}
            <div className="relative w-14 h-14 md:w-[58px] md:h-[58px] rounded-2xl bg-gradient-to-br from-[#2b7fff] via-[#1d5eff] to-[#0f43c9] flex items-center justify-center shadow-lg overflow-hidden border border-blue-400/40 shrink-0">
              <span className="text-white font-extrabold text-4xl italic pr-1 z-10 select-none">
                S
              </span>
              <span className="absolute bottom-3 right-2.5 w-2 h-2 bg-[#facc15] rounded-full z-10"></span>
              <div className="absolute -top-4 -left-4 w-14 h-14 bg-white/25 blur-lg rounded-full"></div>
            </div>

            {/* Company Titles (Arabic + English) */}
            <div className="flex flex-col items-start justify-center leading-tight">
              <h1 className="text-xl md:text-[23px] font-extrabold text-white tracking-normal whitespace-nowrap">
                ساهر للخدمات الذكية
              </h1>
              <span
                className="text-[11px] md:text-[12px] tracking-[0.06em] text-gray-200 font-sans font-semibold uppercase whitespace-nowrap mt-0.5"
                dir="ltr"
              >
                SAHER FOR SMART SERVICES
              </span>
            </div>
          </div>

          {/* Center Section: Department Pill, Arabic Main Title, English Subtitle */}
          <div className="flex flex-col items-center text-center gap-1 flex-1 px-2">
            <div className="bg-[#081c38]/90 border border-[#d4a017] rounded-lg px-5 py-0.5 shadow-xs">
              <span className="text-[#f5c431] text-xs md:text-[15px] font-bold tracking-wide">
                إدارة الخدمات العامة / قسم إدارة المرافق
              </span>
            </div>
            <h2 className="text-white text-sm md:text-[19px] font-extrabold tracking-normal leading-snug mt-0.5">
              نظام تسجيل المبالغ المصروفة من قبل الدعم اللوجستي ( بيتي كاش )
            </h2>
            <p
              className="text-gray-200/95 text-xs md:text-[14px] font-medium tracking-wide font-sans"
              dir="ltr"
            >
              Logistics Petty Cash &amp; Expense Management System
            </p>
          </div>

          {/* Left Section (RTL End): Live Current Date Card */}
          <div className="flex items-center shrink-0">
            <div className="bg-[#06162d]/95 border border-[#294c78] rounded-xl px-4 py-2 shadow-inner min-w-[215px]">
              <div className="flex items-center justify-between gap-3.5">
                {/* Right inside card: Chevron + Day Number */}
                <div className="flex items-center gap-1">
                  <ChevronDown size={14} className="text-[#eab308] shrink-0" />
                  <span className="text-2xl md:text-[26px] font-extrabold text-white font-sans tabular-nums leading-none">
                    {displayDay}
                  </span>
                </div>

                {/* Middle inside card: Weekday + Month & Year */}
                <div className="flex flex-col items-end text-right leading-tight">
                  <span className="text-[11px] text-gray-300 font-semibold">
                    {weekdayAr}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-sm font-bold text-white whitespace-nowrap">
                      {displayMonthAr}
                    </span>
                    <span className="text-sm font-bold text-white font-sans tabular-nums">
                      {displayYear}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-[1px] bg-[#1e3a5f]"></div>

                {/* Left inside card: Gold Calendar Icon */}
                <div className="text-[#eab308] flex items-center justify-center shrink-0">
                  <Calendar size={22} strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Section - Full-Width Edge-to-Edge with Seamless Navy Integration */}
      <section
        className="w-full max-w-none border-b-2 border-[#d4a017] print:hidden relative overflow-hidden"
        style={{
          background:
            'linear-gradient(180deg, #243d51 0%, #172e45 14%, #11283e 32%, #0a1e30 52%, #07192d 72%, #13273c 87%, #294057 98%, #d4a017 100%)',
        }}
      >
        <div className="w-full max-w-none relative min-h-[165px] md:h-[197px] flex items-center">
          {/* Left & Center Photographic Scene - Flush to Left Edge, Exact Native Proportions (No Cropping), Smooth Right Mask */}
          <div
            className="absolute inset-y-0 left-0 h-full w-auto max-w-full overflow-hidden select-none pointer-events-none"
            style={{
              WebkitMaskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)',
              maskImage:
                'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 76%, rgba(0,0,0,0.45) 90%, rgba(0,0,0,0) 100%)',
            }}
          >
            <img
              src="/assets/extracted/hero_scene.png"
              alt="SAHER Logistics Petty Cash Operational Expenses Scene"
              referrerPolicy="no-referrer"
              className="h-full w-auto max-w-none object-cover object-left block"
            />
          </div>

          {/* Mobile/Tablet overlay scrim so text stays 100% legible on narrow screens */}
          <div className="absolute inset-0 bg-[#07172e]/75 lg:hidden pointer-events-none" />

          {/* Flush Bottom-Right Diagonal Gold/Navy Corner Ornament */}
          <svg
            className="absolute right-0 bottom-0 w-16 h-28 pointer-events-none hidden md:block z-10"
            viewBox="0 0 64 112"
            preserveAspectRatio="none"
          >
            <polygon points="20,112 64,20 64,112" fill="#102747" />
            <polygon points="40,112 64,62 64,112" fill="#d4a017" />
          </svg>

          {/* Programmable HTML Text Content on the Right Side (RTL) */}
          <div className="relative z-10 w-full max-w-none px-5 sm:px-8 lg:pr-10 lg:pl-8 py-5 flex justify-start">
            <div className="w-full lg:w-auto flex items-stretch gap-4 text-right">
              {/* Vertical Gold Accent Bar on the Right Edge of the Heading */}
              <div className="w-[3.5px] rounded-full bg-gradient-to-b from-[#facc15] via-[#eab308] to-[#b4820c] shrink-0 my-1 shadow-xs" />

              <div className="flex flex-col justify-center">
                <h2 className="text-[#f5c230] text-lg sm:text-xl md:text-2xl xl:text-[26px] font-extrabold leading-snug tracking-normal drop-shadow-sm whitespace-nowrap">
                  إدارة المصروفات التشغيلية بكفاءة وشفافية
                </h2>
                <p className="text-gray-100 text-sm md:text-[16px] font-medium leading-[1.65] mt-2 max-w-[480px]">
                  نظام مؤسسي لتسجيل ومتابعة المبالغ المصروفة
                  <br className="hidden sm:inline" /> من قبل الدعم اللوجستي (بيتي كاش)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Print Header - Simple White/Blue Version for A4 Paper */}
      <div className="hidden print:block border-2 border-black bg-saaed-blue p-6 text-center mb-6">
        <h1 className="text-xl font-bold mb-4 text-black">
          إدارة الخدمات العامة / قسم إدارة المرافق
        </h1>
        <h2 className="text-lg font-semibold text-black">
          نظام تسجيل المبالغ المصروفة من قبل الدعم اللوجستي ( بيتي كاش )
        </h2>
      </div>
    </>
  );
};