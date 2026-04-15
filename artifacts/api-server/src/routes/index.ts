import { Router } from "express";
import Stripe from "stripe";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import adminRouter from "./admin";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

router.use(healthRouter);
router.use(adminRouter);
router.use(productsRouter);
router.use(categoriesRouter);

router.post("/create-checkout-session", async (req: any, res: any) => {
  console.log("إشارة: تم استلام طلب دفع جديد..."); // للتأكد من وصول الطلب للسيرفر
  
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      console.log("خطأ: السلة فارغة");
      return res.status(400).json({ error: "Cart is empty" });
    }

    const lineItems = items.map((item: any) => {
      // التعامل مع اختلاف بنية البيانات (product object vs flat object)
      const p = item.product || item;
      const price = parseFloat(p.price) || 0;
      
      return {
        price_data: {
          currency: "usd",
          product_data: { 
            name: p.name || "Product",
            images: p.image ? [p.image] : [],
          },
          unit_amount: Math.round(price * 100),
        },
        quantity: parseInt(item.quantity) || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cart`,
    });

    console.log("--- تم إنشاء الرابط بنجاح ---");
    console.log(session.url);
    console.log("----------------------------");

    // نرسل الـ URL والـ ID معاً لضمان توافق الواجهة الأمامية
    return res.json({ id: session.id, url: session.url });

  } catch (error: any) {
    console.error("STRIPE ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
