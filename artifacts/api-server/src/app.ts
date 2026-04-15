import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// --- التعديل الجوهري هنا ---
// تم إعداد CORS للسماح بالطلبات القادمة من الدومين الخاص بك ومن بيئة التطوير
app.use(cors({
  origin: [
    "https://saleemempire.com", 
    "https://smoke-shop-nexus--saleamsmokeshop.replit.app",
    "http://localhost:5173", // لدعم التشغيل المحلي إذا احتجت
    /\.replit\.app$/          // للسماح بأي رابط فرعي من ريبليت
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"]
}));
// -------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
