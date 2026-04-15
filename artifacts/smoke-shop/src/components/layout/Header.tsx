import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Globe, Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/about", label: t("about") },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60" data-testid="header">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* قسم الشعار الجديد: تم استبدال الصورة بشعار برمجي فخم لضمان الظهور */}
        <Link href="/" className="flex items-center gap-2 group" data-testid="link-home-logo">
          <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform group-hover:scale-110 duration-300">
            <span className="font-serif text-black font-black text-xl">S</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight">
            <span className="text-primary">Saleem</span>
            <span className="text-foreground ml-1 group-hover:text-primary transition-colors duration-300">Empire</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              }`}
              data-testid={`link-nav-${link.href.replace("/", "") || "home"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="text-muted-foreground hover:text-foreground"
            data-testid="button-language-toggle"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs ms-1 uppercase font-bold">{language === "en" ? "AR" : "EN"}</span>
          </Button>

          <Link href="/cart" data-testid="link-cart">
            <Button variant="ghost" size="sm" className="relative text-muted-foreground hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -end-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground font-bold border-2 border-background" data-testid="badge-cart-count">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* القائمة الجوالة */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background animate-in slide-in-from-top duration-300" data-testid="nav-mobile">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium py-3 px-2 rounded-lg transition-colors ${
                  isActive(link.href) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`link-mobile-${link.href.replace("/", "") || "home"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
