import { Link } from "wouter";
import { ShoppingCart, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@workspace/api-client-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();

  const name = language === "ar" ? product.nameAr : product.name;
  const categoryName = language === "ar" ? product.categoryNameAr : product.categoryName;
  const hasDiscount = product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <div className="group relative rounded-lg border border-border/40 bg-card overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5" data-testid={`card-product-${product.id}`}>
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={`${import.meta.env.VITE_API_URL?.replace("/api","") ?? ""}${product.imageUrl}`}
            alt={name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 start-2 bg-destructive text-destructive-foreground" data-testid={`badge-sale-${product.id}`}>
              Sale
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 end-2" data-testid={`badge-featured-${product.id}`}>
              {t("featured")}
            </Badge>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{categoryName}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm text-foreground line-clamp-1 hover:text-primary transition-colors" data-testid={`text-product-name-${product.id}`}>
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          <Star className="h-3 w-3 fill-primary text-primary" />
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground" data-testid={`text-price-${product.id}`}>
              ${Number(product.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ${Number(product.compareAtPrice).toFixed(2)}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant={product.inStock ? "default" : "secondary"}
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            data-testid={`button-add-to-cart-${product.id}`}
          >
            {product.inStock ? (
              <ShoppingCart className="h-4 w-4" />
            ) : (
              <span className="text-xs">{t("outOfStock")}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
