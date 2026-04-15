import { Link } from "wouter";
import { MapPin, Phone, Instagram, MessageCircle, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-border/40 bg-card" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* العمود الأول: اسم المتجر (النطاق الكامل) */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary tracking-tight hover:text-foreground transition-colors duration-500 cursor-default">
              Saleemshop<span className="text-foreground/40 text-lg">.com</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("aboutText").substring(0, 150)}...
            </p>
          </div>

          {/* العمود الثاني: الروابط السريعة */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6 border-b border-primary/20 pb-2 w-fit">
              {t("categories")}
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300">
                {t("allProducts")}
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300">
                {t("about")}
              </Link>
            </nav>
          </div>

          {/* العمود الثالث: التواصل الاجتماعي (الأيقونات المتناسقة) */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6 border-b border-primary/20 pb-2 w-fit">
              {language === "ar" ? "تابعنا" : "Follow Us"}
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2.5 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 border border-transparent hover:border-primary/30">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/13473622910" className="p-2.5 rounded-full bg-muted hover:bg-green-600 hover:text-white transition-all duration-300 border border-transparent hover:border-green-400/30">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-muted hover:bg-black hover:text-white transition-all duration-300 border border-transparent hover:border-white/20">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.26-.18-.49-.38-.71-.59V19a5.18 5.18 0 0 1-9.05 3.12 5.2 5.2 0 0 1-.15-5.51c.95-1.63 2.75-2.67 4.63-2.63.14 0 .28.01.42.02v4.16a1.12 1.12 0 0 0-1.28-.02 1.11 1.11 0 0 0-.5 1.4c.14.34.42.61.76.74.34.14.72.12 1.05-.05.34-.17.59-.48.69-.84.03-.09.03-.18.03-.28V0h.43Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* العمود الرابع: معلومات الاتصال (تمت إضافة الإيميل هنا) */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground mb-6 border-b border-primary/20 pb-2 w-fit">
              {t("contactUs")}
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary transition-colors">
                  <MapPin className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                </div>
                <span className="text-sm text-muted-foreground">{t("unitedStates")}</span>
              </div>
              
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary transition-colors">
                  <Phone className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                </div>
                <a href="tel:+13473622910" className="text-sm text-muted-foreground hover:text-primary transition-all">
                  +1 (347) 362-2910
                </a>
              </div>

              {/* البريد الإلكتروني الرسمي الجديد */}
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary transition-colors">
                  <Mail className="h-4 w-4 text-primary group-hover:text-primary-foreground" />
                </div>
                <a href="mailto:info@saleemshop.com" className="text-sm text-muted-foreground hover:text-primary transition-all break-all">
                  info@saleemshop.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* قسم علامات الدفع الاحترافية */}
        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6">
            {language === "ar" ? "وسائل الدفع الآمنة" : "SECURE PAYMENT METHODS"}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
            <span className="text-[#1A1F71] font-black italic text-lg tracking-tighter">VISA</span>
            
            <span className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-4 w-4 rounded-full bg-[#EB001B]" />
                <div className="h-4 w-4 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
              <span className="text-foreground text-[10px] font-bold uppercase tracking-tight">Mastercard</span>
            </span>

            <span className="flex items-center gap-1.5 text-foreground">
              <svg className="h-5 w-5 fill-current mb-1" viewBox="0 0 384 512">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <span className="text-sm font-bold tracking-tight uppercase">Pay</span>
            </span>

            <span className="flex items-center gap-1 text-sm font-bold uppercase tracking-tight">
              <span className="text-[#4285F4]">G</span>
              <span className="text-[#EA4335]">o</span>
              <span className="text-[#FBBC05]">o</span>
              <span className="text-[#4285F4]">g</span>
              <span className="text-[#34A853]">l</span>
              <span className="text-[#EA4335]">e</span>
              <span className="ml-1 text-foreground">Pay</span>
            </span>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
              &copy; {new Date().getFullYear()} Saleemshop.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
