import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useListProducts, useListCategories } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories } = useListCategories();
  const { data: products, isLoading } = useListProducts(
    {
      ...(selectedCategory !== undefined ? { categoryId: selectedCategory } : {}),
      ...(search ? { search } : {}),
    }
  );

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory(undefined);
  };

  const hasFilters = search || selectedCategory !== undefined;

  return (
    <div className="container mx-auto px-4 py-8" data-testid="page-products">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground" data-testid="text-page-title">
          {t("allProducts")}
        </h1>
        <Button
          variant="outline"
          size="sm"
          className="md:hidden gap-2"
          onClick={() => setShowFilters(!showFilters)}
          data-testid="button-toggle-filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className={`md:w-64 space-y-4 ${showFilters ? "block" : "hidden md:block"}`} data-testid="sidebar-filters">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t("search")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ps-9"
              data-testid="input-search"
            />
          </div>

          <div>
            <h3 className="font-medium text-sm text-foreground mb-2">{t("filterByCategory")}</h3>
            <div className="flex flex-wrap gap-2">
              {categories?.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => setSelectedCategory(selectedCategory === cat.id ? undefined : cat.id)}
                  data-testid={`badge-filter-category-${cat.id}`}
                >
                  {language === "ar" ? cat.nameAr : cat.name}
                </Badge>
              ))}
            </div>
          </div>

          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground" data-testid="button-clear-filters">
              <X className="h-3 w-3" />
              {t("clearFilters")}
            </Button>
          )}
        </aside>

        <div className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border border-border/40 bg-card overflow-hidden">
                  <Skeleton className="aspect-square w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t("emptyCart")}</p>
              {hasFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4" data-testid="button-clear-filters-empty">
                  {t("clearFilters")}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
