import React from 'react';
import { MapPin, Phone, Mail, ChevronLeft } from 'lucide-react';

export const ScreenFooter: React.FC = () => {
  return (
    <footer className="bg-[#091526] text-white py-6 border-t-4 border-[#eab308] font-sans print:hidden mt-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* About Section - Right Column */}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                         <h3 className="text-lg font-bold text-white inline-block pb-2 relative">
                            عن SAHER
                            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                         </h3>
                    </div>
                    <p className="text-gray-400 leading-6 text-justify opacity-90 text-sm">
                        شركة رائدة في تقديم الحلول والأنظمة الذكية، ملتزمون بالابتكار والجودة لتحقيق أعلى مستويات الكفاءة والخدمات الذكية.
                    </p>
                </div>

                {/* Quick Links - Center Column */}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                         <h3 className="text-lg font-bold text-white inline-block pb-2 relative">
                            روابط سريعة
                            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                         </h3>
                    </div>
                    <ul className="space-y-2">
                        {['الرئيسية', 'خدماتنا', 'تواصل معنا'].map((link) => (
                            <li key={link} className="flex items-center gap-2 text-gray-400 hover:text-[#eab308] transition-colors cursor-pointer group text-sm">
                                <ChevronLeft size={14} className="text-[#eab308] group-hover:-translate-x-1 transition-transform" />
                                <span>{link}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Us - Left Column */}
                <div className="flex flex-col gap-4">
                    <div className="relative">
                         <h3 className="text-lg font-bold text-white inline-block pb-2 relative">
                            تواصل معنا
                            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-[#eab308]"></span>
                         </h3>
                    </div>
                    <ul className="space-y-3">
                         <li className="flex items-center gap-4 group">
                             <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-gray-800/50 shadow-sm">
                                <MapPin size={16} />
                            </div>
                            <span className="text-gray-400 text-sm dir-ltr font-sans">Level 3, Baynona Building, Khalif City A</span>
                         </li>
                         <li className="flex items-center gap-4 group">
                             <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-gray-800/50 shadow-sm">
                                <Phone size={16} />
                            </div>
                            <span className="text-gray-400 text-sm dir-ltr font-sans">+971 4 123 4567</span>
                         </li>
                         <li className="flex items-center gap-4 group">
                             <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-all shrink-0 border border-gray-800/50 shadow-sm">
                                <Mail size={16} />
                            </div>
                            <span className="text-gray-400 text-sm dir-ltr font-sans">Logistic@saher.ae</span>
                         </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar - Centered */}
            <div className="mt-6 pt-4 border-t border-gray-800/60 flex flex-col items-center justify-center gap-2 text-xs text-gray-500 text-center">
                <div className="font-medium">
                    اعداد وتصميم / <span className="text-[#2563eb]">خالد الجفري</span>
                </div>
                <div className="font-sans flex items-center justify-center gap-1" dir="ltr">
                     <span>SAHER FOR SMART SERVICES {new Date().getFullYear()} &copy;</span>
                     <span className="font-cairo">جميع الحقوق محفوظة لشركة</span>
                </div>
            </div>
        </div>
    </footer>
  );
};

export const PrintFooter: React.FC = () => {
  return null;
};

// Backward compatibility default export if needed, but App.tsx will be updated
export const Footer = PrintFooter;