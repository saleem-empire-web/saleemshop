import { useLanguage } from "@/lib/i18n";
import { Shield, Award, Truck } from "lucide-react";

export default function AboutPage() {
  const { t, language } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleEn: "Premium Quality",
      titleAr: "جودة فاخرة",
      descEn: "Every product in our collection is carefully curated and tested for quality.",
      descAr: "كل منتج في مجموعتنا يتم اختياره واختباره بعناية لضمان الجودة.",
    },
    {
      icon: Award,
      titleEn: "Trusted Brands",
      titleAr: "علامات تجارية موثوقة",
      descEn: "We only carry products from reputable and established manufacturers.",
      descAr: "نحن نقدم فقط منتجات من شركات مصنعة ذات سمعة راسخة.",
    },
    {
      icon: Truck,
      titleEn: "Fast Shipping",
      titleAr: "شحن سريع",
      descEn: "Quick and discreet shipping across the United States.",
      descAr: "شحن سريع وسري في جميع أنحاء الولايات المتحدة.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16" data-testid="page-about">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6" data-testid="text-about-title">
          {t("about")}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-description">
          {t("aboutText")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="text-center rounded-lg border border-border/40 bg-card p-8"
              data-testid={`card-feature-${idx}`}
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                {language === "ar" ? feature.titleAr : feature.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {language === "ar" ? feature.descAr : feature.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
