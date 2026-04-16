import React from "react";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { t, language } = useLanguage();
  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  const [zipCode, setZipCode] = React.useState("");
  const [shipping, setShipping] = React.useState(0);
  const [tax, setTax] = React.useState(0);
  const [showAgeModal, setShowAgeModal] = React.useState(false);
  const [isVerified, setIsVerified] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (zipCode.length === 5) {
      let taxRate = 0.07; 
      if (zipCode.startsWith('10') || zipCode.startsWith('11')) taxRate = 0.088;
      else if (zipCode.startsWith('90') || zipCode.startsWith('91')) taxRate = 0.095;
      else if (zipCode.startsWith('75') || zipCode.startsWith('77')) taxRate = 0.0825;
      else if (zipCode.startsWith('33')) taxRate = 0.06;

      setTax(subtotal * taxRate);
      setShipping(subtotal > 75 ? 0 : 10);
    } else {
      setTax(0);
      setShipping(0);
    }
  }, [zipCode, subtotal]);

  const handleCheckout = async (forceSkip = false) => {
    if (!isVerified && !forceSkip) {
      setShowAgeModal(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items, 
          zipCode, 
          shipping, 
          tax,
          language 
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const session = await response.json();

      // التعديل الجوهري لفتح الرابط مباشرة وتجنب الحظر
      if (session.url) {
        window.location.href = session.url; 
      } else if (session.id) {
        const stripe = (window as any).Stripe("pk_test_51TM9RnFOA3As46Buk5y1uJRH7OwNyZFw16GcJlxsgnE095dPKAn8iodnT3aK8HAEZnicP8119MoWIfAN4WKtvlNr003pWIJygV");
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (error) throw error;
      }

    } catch (error) {
      console.error("Checkout error:", error);
      alert(language === "ar" ? "فشل الاتصال بالدفع. حاول مرة أخرى." : "Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{t("emptyCart")}</h2>
        <Link href="/products">
          <Button className="mt-4 gap-2">{t("shopNow")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {showAgeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-card border border-primary/50 p-8 rounded-xl max-w-md w-full text-center shadow-2xl">
            <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">21+ Age Verification</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              {language === "ar" 
                ? "يجب أن تكون بعمر 21 عاماً أو أكثر لإتمام الشراء." 
                : "This shop requires you to be 21 years of age or older to complete a purchase."}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => window.location.href = "https://google.com"}>
                {language === "ar" ? "تحت 21" : "Under 21"}
              </Button>
              <Button onClick={() => { 
                setIsVerified(true); 
                setShowAgeModal(false); 
                handleCheckout(true); 
              }}>
                {language === "ar" ? "فوق 21" : "Over 21"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">{t("cart")}</h1>
        <Link href="/products">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const name = language === "ar" ? item.product.nameAr : item.product.name;
            return (
              <div key={item.product.id} className="flex gap-4 rounded-lg border border-border/40 bg-card p-4">
                <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img src={`${import.meta.env.VITE_API_URL?.replace("/api","") ?? ""}${item.product.imageUrl}`} alt={name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-foreground truncate">{name}</h3>
                  <p className="text-sm text-primary font-bold mt-1">${Number(item.product.price).toFixed(2)}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-border rounded-md">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                      <span className="w-6 text-center text-xs font-medium">{item.quantity}</span>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                    </div>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.product.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-1">
          <div className="rounded-lg border border-border/40 bg-card p-6 sticky top-24 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">{t("summary")}</h3>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Shipping Zip Code (US)</label>
              <input 
                type="text" maxLength={5} value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
                placeholder="e.g. 90210"
                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:ring-1 focus:ring-primary outline-none"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-foreground text-lg mb-6">
              <span>{t("total")}</span>
              <span>${(subtotal + tax + shipping).toFixed(2)}</span>
            </div>

            <Button 
              className="w-full" size="lg" 
              disabled={zipCode.length < 5 || isLoading}
              onClick={() => handleCheckout()}
            >
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {t("checkout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
