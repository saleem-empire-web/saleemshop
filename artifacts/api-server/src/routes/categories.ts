import { Router, type IRouter } from "express";
import { eq, sql } from "drizzle-orm";
import { db, productsTable, categoriesTable } from "@workspace/db";
import { GetCategoryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/categories", async (_req, res): Promise<void> => {
  const categories = await db
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      nameAr: categoriesTable.nameAr,
      description: categoriesTable.description,
      descriptionAr: categoriesTable.descriptionAr,
      imageUrl: categoriesTable.imageUrl,
      productCount: sql<number>`count(${productsTable.id})::int`,
    })
    .from(categoriesTable)
    .leftJoin(productsTable, eq(categoriesTable.id, productsTable.categoryId))
    .groupBy(categoriesTable.id)
    .orderBy(categoriesTable.name);

  res.json(categories);
});

router.get("/categories/:id", async (req, res): Promise<void> => {
  const params = GetCategoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [category] = await db
    .select()
    .from(categoriesTable)
    .where(eq(categoriesTable.id, params.data.id));

  if (!category) {
    res.status(404).json({ error: "Category not found" });
    return;
  }

  const products = await db
    .select({
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
    })
    .from(productsTable)
    .innerJoin(categoriesTable, eq(productsTable.categoryId, categoriesTable.id))
    .where(eq(productsTable.categoryId, params.data.id));

  res.json({
    id: category.id,
    name: category.name,
    nameAr: category.nameAr,
    description: category.description,
    descriptionAr: category.descriptionAr,
    imageUrl: category.imageUrl,
    products,
  });
});

export default router;
