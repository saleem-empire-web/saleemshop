import { Link } from "wouter";
import { ArrowRight, Flame, Sparkles, TrendingUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useListFeaturedProducts, useListNewArrivals, useListBestSellers, useListCategories } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border/40 bg-card overflow-hidden">
          <Skeleton className="aspect-square w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-20" />
            <div className="flex justify-between items-center pt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-8 w-8 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const { data: featured, isLoading: loadingFeatured } = useListFeaturedProducts();
  const { data: newArrivals, isLoading: loadingNew } = useListNewArrivals();
  const { data: bestSellers, isLoading: loadingBest } = useListBestSellers();
  const { data: categories, isLoading: loadingCats } = useListCategories();

  return (
    <div data-testid="page-home">
      <section className="relative overflow-hidden py-20 md:py-32" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight" data-testid="text-hero-title">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg" data-testid="text-hero-subtitle">
              {t("heroSubtitle")}
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="/products">
                <Button size="lg" className="gap-2" data-testid="button-shop-now">
                  {t("shopNow")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {loadingCats ? (
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
        </section>
      ) : categories && categories.length > 0 && (
        <section className="container mx-auto px-4 py-12" data-testid="section-categories">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t("categories")}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <div className="group relative rounded-lg overflow-hidden bg-card border border-border/40 hover:border-primary/40 transition-all h-32 flex items-end" data-testid={`card-category-${cat.id}`}>
                  <img
                    src={cat.imageUrl}
                    alt={language === "ar" ? cat.nameAr : cat.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity"
                  />
                  <div className="relative z-10 p-3 w-full bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="font-medium text-sm text-white">
                      {language === "ar" ? cat.nameAr : cat.name}
                    </h3>
                    <p className="text-xs text-white/70">{cat.productCount} {t("products")}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12" data-testid="section-featured">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-foreground">{t("featured")}</h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary" data-testid="link-view-all-featured">
              {t("viewAll")} <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        {loadingFeatured ? <ProductGridSkeleton /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12" data-testid="section-new-arrivals">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-foreground">{t("newArrivals")}</h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary" data-testid="link-view-all-new">
              {t("viewAll")} <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        {loadingNew ? <ProductGridSkeleton /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-12" data-testid="section-best-sellers">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-serif text-2xl font-bold text-foreground">{t("bestSellers")}</h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-primary" data-testid="link-view-all-best">
              {t("viewAll")} <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        {loadingBest ? <ProductGridSkeleton /> : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestSellers?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
