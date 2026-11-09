import React from 'react';
import { MapPin, Phone, Mail, ChevronLeft } from 'lucide-react';

export const ScreenFooter: React.FC = () => {
  return (
    <footer
      className="w-full max-w-none text-white border-t-[3px] border-[#eab308] font-sans print:hidden mt-auto relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #031c36 0%, #021935 55%, #041d3b 100%)',
      }}
    >
      {/* Upper Footer Content */}
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 pt-5 pb-4 lg:pb-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Column 1 (Right in RTL - 4 cols): About SAHER + Logo */}
          <div className="lg:col-span-4 flex items-start gap-4 lg:pb-5">
            {/* SAHER Logo Icon on the far right (RTL start) */}
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2b7fff] via-[#1d5eff] to-[#0f43c9] flex items-center justify-center shadow-lg overflow-hidden border border-blue-400/40 shrink-0 mt-0.5">
              <span className="text-white font-extrabold text-3xl italic pr-1 z-10 select-none">
                S
              </span>
              <span className="absolute bottom-2.5 right-2.5 w-2 h-2 bg-[#facc15] rounded-full z-10"></span>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/25 blur-md rounded-full"></div>
            </div>

            <div className="flex flex-col gap-2.5 flex-1 text-right">
              <div>
                <h3 className="text-base md:text-lg font-extrabold text-white inline-block pb-1.5 relative leading-none">
                  عن SAHER
                  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-right text-xs md:text-sm font-medium max-w-[380px]">
                شركة رائدة في تقديم الحلول والأنظمة الذكية، ملتزمون بالابتكار والجودة لتحقيق أعلى مستويات الكفاءة والخدمات الذكية.
              </p>
            </div>
          </div>

          {/* Column 2 (Center-Right in RTL - 2 cols): Quick Links */}
          <div className="lg:col-span-2 flex flex-col items-start lg:items-center lg:pb-5">
            <div className="flex flex-col gap-2.5 text-right">
              <div>
                <h3 className="text-base md:text-lg font-extrabold text-white inline-block pb-1.5 relative leading-none">
                  روابط سريعة
                  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                </h3>
              </div>
              <ul className="space-y-2">
                {['الرئيسية', 'خدماتنا', 'تواصل معنا'].map((link) => {
                  const isContact = link === 'تواصل معنا';
                  return (
                    <li
                      key={link}
                      className={`flex items-center gap-2 text-gray-300 text-xs md:text-sm font-semibold ${
                        isContact
                          ? ''
                          : 'hover:text-[#eab308] transition-colors cursor-pointer group'
                      }`}
                    >
                      <ChevronLeft
                        size={15}
                        className={`text-[#eab308] shrink-0 ${
                          isContact ? '' : 'group-hover:-translate-x-1 transition-transform'
                        }`}
                      />
                      <span>{link}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Column 3 (Center-Left in RTL - 3 cols): Contact Us */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-center lg:pb-5">
            <div className="flex flex-col gap-2.5 text-right">
              <div>
                <h3 className="text-base md:text-lg font-extrabold text-white inline-block pb-1.5 relative leading-none">
                  تواصل معنا
                  <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                </h3>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#153158] flex items-center justify-center text-[#60a5fa] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-[#2b4c7e]">
                    <MapPin size={14} />
                  </div>
                  <span
                    className="text-gray-200 text-xs md:text-sm font-sans font-medium whitespace-nowrap"
                    dir="ltr"
                  >
                    Level 3, Baynona Building, Khalif City A
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#153158] flex items-center justify-center text-[#60a5fa] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-[#2b4c7e]">
                    <Phone size={14} />
                  </div>
                  <span
                    className="text-gray-200 text-xs md:text-sm font-sans font-medium tabular-nums whitespace-nowrap"
                    dir="ltr"
                  >
                    +971 4 123 4567
                  </span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full bg-[#153158] flex items-center justify-center text-[#60a5fa] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-[#2b4c7e]">
                    <Mail size={14} />
                  </div>
                  <span
                    className="text-gray-200 text-xs md:text-sm font-sans font-medium whitespace-nowrap"
                    dir="ltr"
                  >
                    Logistic@saher.ae
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 4 (Far Left in RTL - 3 cols): Abu Dhabi Skyline Illustration Seamlessly Integrated */}
          <div className="lg:col-span-3 flex items-end justify-end self-end w-full -mb-4 lg:mb-0">
            <div
              className="relative flex items-end justify-end overflow-hidden select-none pointer-events-none"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 14%, black 28%, black 100%)',
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.45) 14%, black 28%, black 100%)',
              }}
            >
              <img
                src="/assets/extracted/footer_skyline.png"
                alt="Abu Dhabi Modern Skyline"
                referrerPolicy="no-referrer"
                className="w-[270px] sm:w-[310px] xl:w-[340px] h-auto object-contain object-bottom block"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 8%, black 20%, black 80%, rgba(0,0,0,0.4) 91%, transparent 100%)',
                  maskImage:
                    'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 8%, black 20%, black 80%, rgba(0,0,0,0.4) 91%, transparent 100%)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar with Waving UAE Flag Ribbon on Left */}
      <div className="relative w-full max-w-none border-t border-[#eab308]/85 bg-[#021935] py-3.5 px-4 sm:px-8 overflow-hidden">
        {/* Waving UAE Flag Ribbon (Bottom-Left Corner: Red vertical hoist, Green top, White middle, Black bottom) */}
        <div
          className="absolute left-0 bottom-0 h-full w-[170px] sm:w-[260px] md:w-[340px] pointer-events-none select-none z-0 flex items-end"
          aria-label="علم دولة الإمارات العربية المتحدة"
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, black 0%, black 75%, transparent 100%)',
            maskImage:
              'linear-gradient(to right, black 0%, black 75%, transparent 100%)',
          }}
        >
          <img
            src="/assets/extracted/uae_flag_ribbon.png"
            alt="UAE Flag Ribbon"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-left-bottom"
          />
        </div>

        {/* Right Diagonal Navy Accent Lines */}
        <svg
          className="absolute right-0 bottom-0 h-full w-28 pointer-events-none opacity-45 hidden md:block"
          viewBox="0 0 112 68"
          preserveAspectRatio="none"
        >
          <line x1="25" y1="68" x2="95" y2="0" stroke="#1e40af" strokeWidth="1.5" />
          <polygon points="55,68 112,12 112,68" fill="#071d3a" />
        </svg>

        {/* Centered Designer & Copyright Text */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-1 text-xs md:text-sm text-gray-200 text-center pl-[140px] sm:pl-0">
          <div className="font-bold tracking-wide">
            اعداد وتصميم / <span className="text-[#facc15]">خالد الهاشمي</span>
          </div>
          <div
            className="font-sans flex flex-wrap items-center justify-center gap-1.5 text-gray-300 text-xs"
            dir="ltr"
          >
            <span className="font-semibold">
              SAHER FOR SMART SERVICES {new Date().getFullYear()} &copy;
            </span>
            <span className="font-cairo font-semibold">جميع الحقوق محفوظة لشركة</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const PrintFooter: React.FC = () => {
  return null;
};

export const Footer = PrintFooter;