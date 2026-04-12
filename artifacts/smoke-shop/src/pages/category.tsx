import { useParams } from "wouter";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useGetCategory, getGetCategoryQueryKey } from "@workspace/api-client-react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = parseInt(params.id || "0", 10);
  const { t, language } = useLanguage();

  const { data: category, isLoading } = useGetCategory(categoryId, {
    query: { enabled: !!categoryId, queryKey: getGetCategoryQueryKey(categoryId) },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-96 mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border/40 bg-card overflow-hidden">
              <Skeleton className="aspect-square w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Category not found</p>
        <Link href="/products">
          <Button variant="outline" className="mt-4 gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
          </Button>
        </Link>
      </div>
    );
  }

  const name = language === "ar" ? category.nameAr : category.name;
  const description = language === "ar" ? category.descriptionAr : category.description;

  return (
    <div className="container mx-auto px-4 py-8" data-testid="page-category">
      <Link href="/products">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground mb-6" data-testid="button-back">
          <ArrowLeft className="h-4 w-4" /> {t("allProducts")}
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-foreground" data-testid="text-category-name">
          {name}
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl" data-testid="text-category-description">
          {description}
        </p>
      </div>

      {category.products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
