import { Link } from "wouter";
import { useLanguage } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border/40 bg-card" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary mb-3">Cloud Nine</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("aboutText").substring(0, 120)}...
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-3">
              {t("categories")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-products">
                {t("allProducts")}
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                {t("about")}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-3">
              {t("cart")}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/cart" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-cart">
                {t("cart")}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Cloud Nine Smoke Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
