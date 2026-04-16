import { useParams } from "wouter";
import { Link } from "wouter";
import { ShoppingCart, Star, ArrowLeft, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { useCart } from "@/lib/cart";
import { useGetProduct, useListProducts, getGetProductQueryKey } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const productId = parseInt(params.id || "0", 10);
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useGetProduct(productId, {
    query: { enabled: !!productId, queryKey: getGetProductQueryKey(productId) },
  });

  const { data: relatedProducts } = useListProducts(
    product ? { categoryId: product.categoryId } : undefined,
    {
      query: {
        enabled: !!product?.categoryId,
      },
    }
  );

  const related = relatedProducts?.filter((p) => p.id !== productId).slice(0, 4);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Link href="/products">
          <Button variant="outline" className="mt-4 gap-2" data-testid="button-back-products">
            <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
          </Button>
        </Link>
      </div>
    );
  }

  const name = language === "ar" ? product.nameAr : product.name;
  const description = language === "ar" ? product.descriptionAr : product.description;
  const categoryName = language === "ar" ? product.categoryNameAr : product.categoryName;
  const hasDiscount = product.compareAtPrice != null && product.compareAtPrice > product.price;

  return (
    <div className="container mx-auto px-4 py-8" data-testid="page-product-detail">
      <Link href="/products">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square rounded-lg overflow-hidden bg-muted relative">
          <img
            src={`${import.meta.env.VITE_API_URL?.replace("/api","") ?? ""}${product.imageUrl}`}
            alt={name}
            className="object-cover w-full h-full"
          />
          {hasDiscount && (
            <Badge className="absolute top-4 start-4 bg-destructive text-destructive-foreground">
              Sale
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Link href={`/categories/${product.categoryId}`}>
              <Badge variant="outline" className="mb-2 cursor-pointer hover:bg-muted" data-testid="badge-category">
                {categoryName}
              </Badge>
            </Link>
            <h1 className="font-serif text-3xl font-bold text-foreground" data-testid="text-product-name">
              {name}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} {t("reviews")})
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground" data-testid="text-product-price">
              ${Number(product.price).toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">
                ${Number(product.compareAtPrice).toFixed(2)}
              </span>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-medium text-sm text-foreground mb-2">{t("description")}</h3>
            <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {description}
            </p>
          </div>

          <Separator />

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border border-border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                data-testid="button-decrease-qty"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-medium" data-testid="text-quantity">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                data-testid="button-increase-qty"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              className="flex-1 gap-2"
              disabled={!product.inStock}
              onClick={() => addToCart(product, quantity)}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="h-4 w-4" />
              {product.inStock ? t("addToCart") : t("outOfStock")}
            </Button>
          </div>

          {!product.inStock && (
            <p className="text-sm text-destructive">{t("outOfStock")}</p>
          )}
        </div>
      </div>

      {related && related.length > 0 && (
        <section className="mt-16" data-testid="section-related-products">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            {t("relatedProducts")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
