import { Router, type IRouter } from "express";
import { eq, and, gte, lte, ilike, desc, sql } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import {
  ListProductsQueryParams,
  GetProductParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

const productWithCategory = {
  id: productsTable.id,
  name: productsTable.name,
  nameAr: productsTable.nameAr,
  description: productsTable.description,
  descriptionAr: productsTable.descriptionAr,
  price: productsTable.price,
  compareAtPrice: productsTable.compareAtPrice,
  imageUrl: productsTable.imageUrl,
  categoryId: productsTable.categoryId,
  categoryName: categoriesTable.name,
  categoryNameAr: categoriesTable.nameAr,
  featured: productsTable.featured,
  inStock: productsTable.inStock,
  rating: productsTable.rating,
  reviewCount: productsTable.reviewCount,
  createdAt: productsTable.createdAt,
};

router.get("/products", async (req, res): Promise<void> => {
  const parsed = ListProductsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const conditions = [];
  if (parsed.data.categoryId != null) {
    conditions.push(eq(productsTable.categoryId, parsed.data.categoryId));
  }
  if (parsed.data.featured != null) {
    conditions.push(eq(productsTable.featured, parsed.data.featured));
  }
  if (parsed.data.search) {
    conditions.push(ilike(productsTable.name, `%${parsed.data.search}%`));
  }
  if (parsed.data.minPrice != null) {
    conditions.push(gte(productsTable.price, String(parsed.data.minPrice)));
  }
  if (parsed.data.maxPrice != null) {
    conditions.push(lte(productsTable.price, String(parsed.data.maxPrice)));
  }

  const products = await db
    .select(productWithCategory)
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(productsTable.createdAt));

  res.json(products);
});

router.get("/products/featured", async (_req, res): Promise<void> => {
  const products = await db
    .select(productWithCategory)
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.featured, true))
    .orderBy(desc(productsTable.createdAt));

  res.json(products);
});

router.get("/products/new-arrivals", async (_req, res): Promise<void> => {
  const products = await db
    .select(productWithCategory)
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .orderBy(desc(productsTable.createdAt))
    .limit(8);

  res.json(products);
});

router.get("/products/best-sellers", async (_req, res): Promise<void> => {
  const products = await db
    .select(productWithCategory)
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .orderBy(desc(productsTable.reviewCount))
    .limit(8);

  res.json(products);
});

router.get("/products/:id", async (req, res): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select(productWithCategory)
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(product);
});

router.get("/store/summary", async (_req, res): Promise<void> => {
  const [productCount] = await db.select({ count: sql<number>`count(*)::int` }).from(productsTable);
  const [categoryCount] = await db.select({ count: sql<number>`count(*)::int` }).from(categoriesTable);
  const [featuredCount] = await db.select({ count: sql<number>`count(*)::int` }).from(productsTable).where(eq(productsTable.featured, true));
  const [priceRange] = await db.select({
    min: sql<number>`coalesce(min(price)::float, 0)`,
    max: sql<number>`coalesce(max(price)::float, 0)`,
  }).from(productsTable);

  const newArrivals = await db.select({ count: sql<number>`count(*)::int` }).from(productsTable).orderBy(desc(productsTable.createdAt)).limit(8);

  res.json({
    totalProducts: productCount?.count ?? 0,
    totalCategories: categoryCount?.count ?? 0,
    featuredCount: featuredCount?.count ?? 0,
    newArrivalsCount: Math.min(newArrivals[0]?.count ?? 0, 8),
    priceRange: {
      min: priceRange?.min ?? 0,
      max: priceRange?.max ?? 0,
    },
  });
});

export default router;
