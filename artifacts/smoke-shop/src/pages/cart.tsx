import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
  const { t, language } = useLanguage();
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" data-testid="page-cart-empty">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">{t("emptyCart")}</h2>
        <Link href="/products">
          <Button className="mt-4 gap-2" data-testid="button-shop-now">
            {t("shopNow")}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" data-testid="page-cart">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground" data-testid="text-cart-title">
          {t("cart")}
        </h1>
        <Link href="/products">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" data-testid="button-continue-shopping">
            <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => {
            const name = language === "ar" ? item.product.nameAr : item.product.name;
            return (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-lg border border-border/40 bg-card p-4"
                data-testid={`cart-item-${item.product.id}`}
              >
                <Link href={`/products/${item.product.id}`}>
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product.id}`}>
                    <h3 className="font-medium text-sm text-foreground truncate hover:text-primary transition-colors" data-testid={`text-cart-item-name-${item.product.id}`}>
                      {name}
                    </h3>
                  </Link>
                  <p className="text-sm text-primary font-bold mt-1" data-testid={`text-cart-item-price-${item.product.id}`}>
                    ${Number(item.product.price).toFixed(2)}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 border border-border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        data-testid={`button-decrease-${item.product.id}`}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs font-medium" data-testid={`text-qty-${item.product.id}`}>
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        data-testid={`button-increase-${item.product.id}`}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                      data-testid={`button-remove-${item.product.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-1">
          <div className="rounded-lg border border-border/40 bg-card p-6 sticky top-24" data-testid="cart-summary">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">{t("subtotal")}</h3>

            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate max-w-[60%]">
                    {language === "ar" ? item.product.nameAr : item.product.name} x{item.quantity}
                  </span>
                  <span className="text-foreground">${(Number(item.product.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-foreground">
              <span>{t("total")}</span>
              <span data-testid="text-cart-total">${subtotal.toFixed(2)}</span>
            </div>

            <Button className="w-full mt-6" size="lg" data-testid="button-checkout">
              {t("checkout")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
